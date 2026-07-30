import * as React from 'react';
import { Slot as RadixSlot } from '@radix-ui/react-slot';
import { cn } from '../../lib/utils';

const Slot = React.forwardRef<HTMLSpanElement, React.ComponentPropsWithoutRef<typeof RadixSlot>>(
  ({ className, children, ...props }, ref) => {
    return (
      <RadixSlot ref={ref} className={cn(className)} {...props}>
        {children}
      </RadixSlot>
    );
  }
);
Slot.displayName = RadixSlot.displayName;

export { Slot };