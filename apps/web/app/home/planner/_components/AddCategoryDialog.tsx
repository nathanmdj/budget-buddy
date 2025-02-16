'use client';

import { useState } from 'react';

import { Plus } from 'lucide-react';

import { Button } from '@kit/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@kit/ui/dialog';
import { Input } from '@kit/ui/input';

import type { BudgetCategory } from './types';

export function AddCategoryDialog({
  onAddCategory,
}: {
  onAddCategory: (category: Omit<BudgetCategory, 'id'>) => void;
}) {
  const [open, setOpen] = useState(false);
  const [newCategory, setNewCategory] = useState<Omit<BudgetCategory, 'id'>>({
    name: '',
    allocated: 0,
    spent: 0,
    items: [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddCategory(newCategory);
    setNewCategory({ name: '', allocated: 0, spent: 0, items: [] });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mt-4 w-full">
          <Plus className="mr-2 h-4 w-4" /> Add New Category
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Budget Category</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Category Name
            </label>
            <Input
              id="name"
              value={newCategory.name}
              onChange={(e) =>
                setNewCategory({ ...newCategory, name: e.target.value })
              }
              required
            />
          </div>
          {/* <div>
            <label
              htmlFor="allocated"
              className="block text-sm font-medium text-gray-700"
            >
              Allocated Amount
            </label>
            <Input
              id="allocated"
              type="number"
              value={newCategory.allocated}
              onChange={(e) =>
                setNewCategory({
                  ...newCategory,
                  allocated: Number.parseFloat(e.target.value) || 0,
                })
              }
              required
            />
          </div> */}
          <Button type="submit" className="w-full">
            Add Category
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
