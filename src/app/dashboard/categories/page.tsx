'use client';
import React, { useState, useMemo } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, GripVertical, MoreHorizontal } from 'lucide-react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
  UniqueIdentifier,
  DragStartEvent,
  DragOverEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  horizontalListSortingStrategy,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { produce } from 'immer';
import { Badge } from '@/components/ui/badge';

type Item = {
  id: UniqueIdentifier;
  name: string;
};

type Column = {
  id: UniqueIdentifier;
  name: string;
  items: Item[];
};

const initialBoardData: Column[] = [
  {
    id: 'food',
    name: 'Food',
    items: [
      { id: 'item-1', name: 'Breakfast' },
      { id: 'item-2', name: 'Pancakes & French Toast' },
      { id: 'item-3', name: 'Keto & Vegan' },
    ],
  },
  {
    id: 'beverages',
    name: 'Beverages',
    items: [
      { id: 'item-4', name: 'Coffee' },
      { id: 'item-5', name: 'Juices' },
    ],
  },
  {
    id: 'specials',
    name: 'Special Offers',
    items: [],
  },
];

function SortableItem({ item }: { item: Item }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Card ref={setNodeRef} style={style} className="mb-3" {...attributes}>
      <CardContent className="p-3 flex items-center justify-between">
        <span className="font-medium text-sm">{item.name}</span>
        <button {...listeners} className="cursor-grab p-1 text-muted-foreground hover:text-foreground">
          <GripVertical className="h-5 w-5" />
        </button>
      </CardContent>
    </Card>
  );
}

function BoardColumn({ column }: { column: Column }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: column.id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.8 : 1,
  };
  
  const itemIds = useMemo(() => column.items.map(i => i.id), [column.items]);

  return (
    <div ref={setNodeRef} style={style} className="flex-shrink-0 w-80">
      <Card className="bg-muted/50">
        <CardHeader className="p-3 flex flex-row items-center justify-between border-b" {...attributes} {...listeners}>
          <CardTitle className="text-base font-semibold cursor-grab">{column.name}</CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{column.items.length}</Badge>
            <Button variant="ghost" size="icon" className="h-7 w-7">
                <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-3 min-h-[100px]">
          <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
            {column.items.map((item) => (
              <SortableItem key={item.id} item={item} />
            ))}
          </SortableContext>
        </CardContent>
      </Card>
    </div>
  );
}

export default function CategoriesPage() {
  const [board, setBoard] = useState<Column[]>(initialBoardData);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeItem, setActiveItem] = useState<Item | null>(null);
  
  const columnIds = useMemo(() => board.map(col => col.id), [board]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const findColumn = (id: UniqueIdentifier) => board.find(col => col.id === id);
  const findItem = (id: UniqueIdentifier) => board.flatMap(col => col.items).find(item => item.id === id);
  const findColumnOfItem = (id: UniqueIdentifier) => board.find(col => col.items.some(item => item.id === id));

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    if (findColumn(active.id)) {
        setActiveColumn(findColumn(active.id));
    } else if (findItem(active.id)) {
        setActiveItem(findItem(active.id));
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over || !activeItem) return;

    const activeContainer = findColumnOfItem(active.id);
    const overContainer = findColumn(over.id) || findColumnOfItem(over.id);

    if (!activeContainer || !overContainer || activeContainer.id === overContainer.id) {
      return;
    }

    setBoard(produce(board => {
        const activeColumn = board.find(c => c.id === activeContainer.id)!;
        const overColumn = board.find(c => c.id === overContainer.id)!;
        
        const activeIndex = activeColumn.items.findIndex(i => i.id === active.id);
        const [movedItem] = activeColumn.items.splice(activeIndex, 1);
        
        let overIndex = overColumn.items.findIndex(i => i.id === over.id);
        if (overIndex === -1) {
            // Dropping on column, not on an item
            overIndex = overColumn.items.length;
        }

        overColumn.items.splice(overIndex, 0, movedItem);
    }));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveColumn(null);
    setActiveItem(null);

    if (!over) return;
    
    if (active.id === over.id) return;
    
    // Dragging a column
    if (activeColumn) {
        setBoard(produce(board => {
            const oldIndex = board.findIndex(c => c.id === active.id);
            const newIndex = board.findIndex(c => c.id === over.id);
            const [movedColumn] = board.splice(oldIndex, 1);
            board.splice(newIndex, 0, movedColumn);
        }));
        return;
    }

    // Dragging an item
    if (activeItem) {
        const activeContainer = findColumnOfItem(active.id)!;
        const overContainer = findColumnOfItem(over.id) || findColumn(over.id)!;

        setBoard(produce(board => {
            const activeCol = board.find(c => c.id === activeContainer.id)!;
            const overCol = board.find(c => c.id === overContainer.id)!;

            const activeIndex = activeCol.items.findIndex(i => i.id === active.id);
            const [movedItem] = activeCol.items.splice(activeIndex, 1);

            let overIndex = overCol.items.findIndex(i => i.id === over.id);
            // If dropping on the column itself, add to the end
            if (overIndex === -1 && findColumn(over.id)) {
                overIndex = overCol.items.length;
            }

            overCol.items.splice(overIndex, 0, movedItem);
        }));
    }
  };

  return (
    <>
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-card px-4 sm:px-6 lg:px-8 justify-between">
        <h1 className="text-xl font-semibold flex items-center gap-2">
          Menu Board Editor
          <Badge variant="destructive">BLOOMSBURY'S (RAS AL KHAIMAH)</Badge>
        </h1>
        <div className="flex items-center gap-4">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Category
          </Button>
          <Button variant="secondary">PUBLISH</Button>
        </div>
      </header>

      <main className="p-4 sm:p-6 lg:p-8 flex-grow">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className="flex gap-6 overflow-x-auto pb-4">
              <SortableContext items={columnIds} strategy={horizontalListSortingStrategy}>
                {board.map((column) => (
                  <BoardColumn key={column.id} column={column} />
                ))}
              </SortableContext>
          </div>
          <DragOverlay>
            {activeColumn ? (
                <div className="flex-shrink-0 w-80">
                    <Card className="bg-card opacity-90 shadow-2xl">
                        <CardHeader className="p-3 flex flex-row items-center justify-between border-b">
                          <CardTitle className="text-base font-semibold">{activeColumn.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-3 min-h-[100px]">
                            <SortableContext items={activeColumn.items.map(i => i.id)} strategy={verticalListSortingStrategy}>
                                {activeColumn.items.map(item => (
                                    <SortableItem key={item.id} item={item} />
                                ))}
                            </SortableContext>
                        </CardContent>
                    </Card>
                </div>
            ) : null}
            {activeItem ? (
                <Card>
                    <CardContent className="p-3 flex items-center justify-between">
                        <span className="font-medium text-sm">{activeItem.name}</span>
                        <GripVertical className="h-5 w-5 text-muted-foreground" />
                    </CardContent>
                </Card>
            ) : null}
          </DragOverlay>
        </DndContext>
      </main>
    </>
  );
}
