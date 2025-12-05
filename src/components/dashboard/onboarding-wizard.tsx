'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Zap, Edit, Clock, HelpCircle, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

const steps = [
  'Welcome',
  'Business',
  'Branch',
  'Menu',
  'Design',
  'Publish',
  'QR',
];

export function OnboardingWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();

  const handleClose = () => {
    setIsOpen(false);
    router.push('/dashboard');
  };

  if (!isOpen) {
    return null;
  }
  
  const progressPercentage = ((currentStep + 1) / steps.length) * 100;

  const WelcomeStep = () => (
    <>
      <DialogHeader className="text-center">
        <DialogTitle className="text-3xl font-bold">
          Welcome to eMenu!
        </DialogTitle>
        <DialogDescription className="text-lg text-muted-foreground">
          Let&apos;s get your digital menu set up in just a few minutes.
        </DialogDescription>
      </DialogHeader>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 border-transparent hover:border-primary">
          <CardContent className="p-6 text-center">
            <Zap className="mx-auto h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              Connect POS (Recommended)
            </h3>
            <p className="text-muted-foreground mb-4">
              Automatically sync your menu by connecting your existing Point of
              Sale system.
            </p>
            <div className="flex items-center justify-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-2" />
              <span>Estimated time: 5-15 minutes</span>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 border-transparent hover:border-primary">
          <CardContent className="p-6 text-center">
            <Edit className="mx-auto h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              Build Menu Manually
            </h3>
            <p className="text-muted-foreground mb-4">
              Create your categories and items from scratch using our menu
              builder.
            </p>
            <div className="flex items-center justify-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-2" />
              <span>Estimated time: 30-90 minutes</span>
            </div>
          </CardContent>
        </Card>
      </div>
      <DialogFooter className="flex-col-reverse sm:flex-row sm:justify-between w-full">
         <Button variant="ghost" className="flex items-center gap-2">
          <HelpCircle className="h-4 w-4" />
          Need Help?
        </Button>
        <div className="flex items-center gap-4">
          <Button variant="link" onClick={handleClose}>
            I&apos;ll do this later
          </Button>
          <Button onClick={() => setCurrentStep(currentStep + 1)}>
            Let&apos;s Go <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </DialogFooter>
    </>
  );

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <WelcomeStep />;
      default:
        return (
          <div className='text-center p-8'>
            <p className='text-lg'>Step {currentStep + 1} placeholder.</p>
            <Button onClick={() => setCurrentStep(currentStep + 1)}>Next</Button>
            {currentStep > 0 && <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)}>Back</Button>}
          </div>
        )
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl w-full p-8 overflow-hidden">
        <div className="flex flex-col h-full">
          {/* Stepper */}
          <div className="w-full mb-8">
            <div className="flex justify-between mb-2">
              {steps.map((step, index) => (
                <div key={step} className="text-center">
                  <div
                    className={`text-sm font-medium ${
                      index <= currentStep
                        ? 'text-primary'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {step}
                  </div>
                </div>
              ))}
            </div>
            <Progress value={progressPercentage} className="w-full" />
            <div className="text-center text-sm text-muted-foreground mt-2">
              You&apos;re {Math.round(progressPercentage)}% done!
            </div>
          </div>
          
          <div className="flex-grow">
            {renderStep()}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
