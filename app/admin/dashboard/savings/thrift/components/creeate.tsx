// app/dashboard/thrift/create/page.tsx
'use client';

import { useFormState } from 'react-dom';
import { ThriftCategory } from '@prisma/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { createThriftContribution } from '@/actions';

export default function CreateThriftPage() {
  const [state, formAction] = useFormState(createThriftContribution, null);

  return (
    <div className="max-w-2xl ">
      
      <form action={formAction} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="category">Thrift Category</Label>
            <select
              id="category"
              name="category"
              className="w-full p-2 border rounded-md"
              required
            >
              <option value="">Select a category</option>
              {Object.values(ThriftCategory).map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0) + category.slice(1).toLowerCase()}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dailyAmount">Daily Amount (₦)</Label>
            <Input
              id="dailyAmount"
              name="dailyAmount"
              type="number"
              step="0.01"
              required
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              className="w-full"
              rows={4}
            />
          </div>
        </div>

        {state?.error && (
          <p className="text-red-500 text-sm">{state.error}</p>
        )}

        <Button 
          type="submit" 
          className="w-full"
          // Add loading state if needed
        >
          Create Thrift Plan
        </Button>
      </form>
    </div>
  );
}