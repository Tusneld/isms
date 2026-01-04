import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";

/**
 * MultiStepForm Component
 * * @param {Array} steps - Array of objects { id, title, description, content }
 * @param {Function} onComplete - Callback when the final step is submitted
 * @param {Function} onCancel - Optional callback for cancellation
 * @param {Boolean} isSubmitting - Loading state for the submit button
 * @param {String} submitLabel - Text for the final button
 */
export function MultiStepForm({
  steps,
  onComplete,
  onCancel,
  isSubmitting = false,
  submitLabel = "Submit",
}) {
  const [currentStep, setCurrentStep] = useState(0);

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;
  const currentStepData = steps[currentStep];

  const goNext = () => {
    if (!isLastStep) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const goPrev = () => {
    if (!isFirstStep) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div className="w-full">
      {/* Step Indicators */}
      <div className="mb-8">
        <div className="flex items-center justify-between relative">
          {/* Progress Line */}
          <div className="absolute top-4 left-0 right-0 h-0.5 bg-muted">
            <div
              className="h-full bg-primary transition-all duration-500"
              style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            />
          </div>

          {/* Step Circles */}
          {steps.map((step, index) => {
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep;

            return (
              <div
                key={step.id}
                className="relative flex flex-col items-center z-10"
              >
                <div
                  className={cn(
                    "form-step-indicator flex items-center justify-center rounded-full border-2 transition-colors duration-200",
                    isCompleted && "bg-primary border-primary text-white",
                    isCurrent && "border-primary bg-background text-primary",
                    !isCompleted && !isCurrent && "border-muted bg-muted text-muted-foreground"
                  )}
                  style={{ width: '32px', height: '32px' }} // Fallback if CSS classes aren't in globals
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <span className="text-sm">{index + 1}</span>
                  )}
                </div>
                <div className="mt-2 text-center">
                  <p
                    className={cn(
                      "text-xs font-medium",
                      isCurrent ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    {step.title}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Content */}
      <div className="min-h-[300px] animate-fade-in" key={currentStep}>
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-foreground">
            {currentStepData.title}
          </h3>
          {currentStepData.description && (
            <p className="text-sm text-muted-foreground mt-1">
              {currentStepData.description}
            </p>
          )}
        </div>
        {currentStepData.content}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
        <div>
          {onCancel && (
            <Button variant="ghost" onClick={onCancel} type="button">
              Cancel
            </Button>
          )}
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={goPrev}
            disabled={isFirstStep}
            type="button"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </Button>
          {isLastStep ? (
            <Button
              variant="default" // Changed from 'gradient' to 'default' unless you have a custom gradient variant
              onClick={onComplete}
              disabled={isSubmitting}
              type="button"
            >
              {isSubmitting ? "Submitting..." : submitLabel}
            </Button>
          ) : (
            <Button variant="default" onClick={goNext} type="button">
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}