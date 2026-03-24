'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Sheet, SheetContent, SheetClose, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { X, Edit, Minus, Plus, Check } from 'lucide-react';
import gsap from 'gsap';
import { cn } from '@/lib/utils';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface ProductDetailSheetProps {
  product: Product | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProductDetailSheet({ product, isOpen, onOpenChange }: ProductDetailSheetProps) {
  const [quantity, setQuantity] = useState(1);
  const [specialRequest, setSpecialRequest] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const addToCartButtonRef = useRef<HTMLButtonElement>(null);
  
  if (!product) return null;

  const handleAddToCart = () => {
    if (!addToCartButtonRef.current || isAdding) return;

    setIsAdding(true);
    
    const cartIcon = document.getElementById('floating-cart-icon');
    const button = addToCartButtonRef.current;

    if (cartIcon) {
        const buttonRect = button.getBoundingClientRect();
        const cartRect = cartIcon.getBoundingClientRect();

        // Create a clone of the button to animate
        const clone = button.cloneNode(true) as HTMLElement;
        clone.style.position = 'fixed';
        clone.style.left = `${buttonRect.left}px`;
        clone.style.top = `${buttonRect.top}px`;
        clone.style.width = `${buttonRect.width}px`;
        clone.style.height = `${buttonRect.height}px`;
        clone.style.margin = '0';
        clone.style.zIndex = '51'; // Above sheet overlay
        document.body.appendChild(clone);

        // Animate the clone
        gsap.to(clone, {
            left: cartRect.left + (cartRect.width / 2) - (buttonRect.height / 2), // Center on cart
            top: cartRect.top + (cartRect.height / 2) - (buttonRect.height / 2),
            width: buttonRect.height, // Make it square
            height: buttonRect.height,
            borderRadius: '50%',
            scale: 0.5,
            opacity: 0.8,
            duration: 0.7,
            ease: 'power2.in',
            onComplete: () => {
                document.body.removeChild(clone);

                // Shake the cart icon
                gsap.fromTo(cartIcon, 
                    { scale: 1.1, rotate: -5 }, 
                    { scale: 1, rotate: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' }
                );
                
                // Close sheet and reset state after a short delay
                setTimeout(() => {
                    onOpenChange(false);
                    setIsAdding(false);
                    setQuantity(1);
                    setSpecialRequest('');
                }, 100);
            }
        });

    } else {
        // Fallback if cart icon not found
        setTimeout(() => {
            onOpenChange(false);
            setIsAdding(false);
            setQuantity(1);
            setSpecialRequest('');
        }, 500);
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={(open) => {
        if (!open) {
             // Reset state when closing manually
             setIsAdding(false);
             setQuantity(1);
             setSpecialRequest('');
        }
        onOpenChange(open);
    }}>
      <SheetContent side="bottom" className="w-full max-w-md mx-auto p-0 rounded-t-3xl border-0">
        <SheetHeader className="sr-only">
            <SheetTitle>Product: {product.name}</SheetTitle>
            <SheetDescription>
                Add special requests and select quantity for {product.name}.
            </SheetDescription>
        </SheetHeader>
        <div className="relative">
          <div className="relative h-56 w-full">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover rounded-t-3xl"
            />
          </div>
          <SheetClose asChild>
            <Button
              size="icon"
              className="absolute top-4 right-4 h-8 w-8 rounded-full bg-black/50 text-white hover:bg-black/70"
            >
              <X className="h-5 w-5" />
            </Button>
          </SheetClose>
        </div>

        <div className="p-6 space-y-4 bg-white">
          <h2 className="text-2xl font-bold text-gray-800">{product.name}</h2>
          <p className="text-gray-500 text-sm">{product.description}</p>
          <p className="text-2xl font-bold text-gray-900">
            AED {product.price.toFixed(2)} <span className="text-sm font-normal text-gray-400">(Base Price)</span>
          </p>

          <div className="p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <Edit className="h-4 w-4 text-gray-500" />
              <h3 className="font-semibold text-gray-800">Special requests</h3>
            </div>
            <p className="text-xs text-gray-500 mb-3">
              We&apos;ll pass your special request to the restaurant, and they&apos;ll do their best to follow it. However, a refund isn&apos;t available if they can&apos;t.
            </p>
            <div className="relative">
                <Textarea
                    placeholder="For example: less spicy, no sugar, etc."
                    className="bg-white"
                    maxLength={150}
                    value={specialRequest}
                    onChange={(e) => setSpecialRequest(e.target.value)}
                />
                <span className="absolute bottom-2 right-2 text-xs text-gray-400">
                    {specialRequest.length}/150
                </span>
            </div>
          </div>
        </div>
        
        <div className="sticky bottom-0 bg-white p-4 border-t shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
            <div className="flex items-center gap-4">
                <div className="flex items-center justify-between rounded-lg p-1 border w-32">
                    <Button size="icon" variant="ghost" className="h-9 w-9 text-gray-700" onClick={() => setQuantity(q => Math.max(1, q - 1))} disabled={isAdding}>
                        <Minus className="h-5 w-5" />
                    </Button>
                    <span className="font-bold text-lg text-gray-800">{quantity}</span>
                    <Button size="icon" variant="ghost" className="h-9 w-9 text-gray-700" onClick={() => setQuantity(q => q + 1)} disabled={isAdding}>
                        <Plus className="h-5 w-5" />
                    </Button>
                </div>
                <Button 
                    ref={addToCartButtonRef}
                    className="flex-1 h-12 bg-teal-500 hover:bg-teal-600 text-white font-bold text-base" 
                    onClick={handleAddToCart}
                    disabled={isAdding}
                >
                  {isAdding ? <Check className="h-5 w-5" /> : `Add • AED ${(product.price * quantity).toFixed(2)}`}
                </Button>
            </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
