'use client';

import { useEffect, useState } from 'react';

import { ChevronLeft, ChevronRight, Pencil, Plus, Trash2 } from 'lucide-react';

import { Button } from '@kit/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@kit/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@kit/ui/dialog';
import { Input } from '@kit/ui/input';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@kit/ui/sheet';

import { formatCurrency } from '~/lib/utils';

import { AddCategoryDialog } from './AddCategoryDialog';
import { CreatePlanForm } from './CreatePlanForm';
import type { BudgetCategory, BudgetItem, BudgetPlan } from './types';

type Props = {
  plans: BudgetPlan[];
  selectedPlan: BudgetPlan | null;
  onSelectPlan: (id: string) => void;
  onCreatePlan: (plan: Omit<BudgetPlan, 'id'>) => void;
  onUpdatePlan: (plan: BudgetPlan) => void;
};

export function BudgetPlanManager({
  plans,
  selectedPlan,
  onSelectPlan,
  onCreatePlan,
  onUpdatePlan,
}: Props) {
  const [editedPlan, setEditedPlan] = useState<BudgetPlan | null>(selectedPlan);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  console.log('editedPlan', editedPlan);
  console.log('selectedPlan', selectedPlan);
  const currentIndex = selectedPlan
    ? plans.findIndex((p) => p.id === selectedPlan.id)
    : -1;

  const handlePrevious = () => {
    const prevPlan = plans[currentIndex - 1];
    if (currentIndex > 0 && prevPlan) {
      onSelectPlan(prevPlan.id);
    }
  };

  const handleNext = () => {
    const nextPlan = plans[currentIndex + 1];
    if (currentIndex < plans.length - 1 && nextPlan) {
      onSelectPlan(nextPlan.id);
    }
  };

  const handleCreateNewPlan = (newPlan: Omit<BudgetPlan, 'id'>) => {
    onCreatePlan(newPlan);
    setIsCreateDialogOpen(false);
  };

  const handleAddCategory = (newCategory: Omit<BudgetCategory, 'id'>) => {
    if (!editedPlan) return;
    const id = Math.max(...editedPlan.categories.map((c) => c.id), 0) + 1;
    const updatedPlan = {
      ...editedPlan,
      categories: [...editedPlan.categories, { ...newCategory, id }],
    };
    setEditedPlan(updatedPlan);
  };

  // const handleEditCategory = (editedCategory: BudgetCategory) => {
  //   if (!editedPlan) return;
  //   const updatedPlan = {
  //     ...editedPlan,
  //     categories: editedPlan.categories.map((category) =>
  //       category.id === editedCategory.id ? editedCategory : category,
  //     ),
  //   };
  //   setEditedPlan(updatedPlan);
  // };

  const handleDeleteCategory = (id: number) => {
    if (!editedPlan) return;
    const updatedPlan = {
      ...editedPlan,
      categories: editedPlan.categories.filter(
        (category) => category.id !== id,
      ),
    };
    setEditedPlan(updatedPlan);
  };

  const handleSaveEdit = () => {
    if (!editedPlan) return;
    onUpdatePlan(editedPlan);
  };

  useEffect(() => {
    setEditedPlan(selectedPlan);
  }, [selectedPlan]);

  function CategoryItemsList({
    category,
    onUpdateItems,
  }: {
    category: BudgetCategory;
    onUpdateItems: (categoryId: number, items: BudgetItem[]) => void;
  }) {
    const [newItemName, setNewItemName] = useState('');
    const [newItemAmount, setNewItemAmount] = useState<number>(0);

    const handleAddItem = () => {
      if (!newItemName || newItemAmount <= 0) return;

      const newItem: BudgetItem = {
        id:
          Math.max(...(category?.items?.map((item) => item.id) ?? [0]), 0) + 1,
        name: newItemName,
        amount: newItemAmount,
      };

      onUpdateItems(category.id, [...(category?.items ?? []), newItem]);
      setNewItemName('');
      setNewItemAmount(0);
    };

    const handleDeleteItem = (itemId: number) => {
      onUpdateItems(
        category.id,
        category.items.filter((item) => item.id !== itemId),
      );
    };

    return (
      <div className="space-y-2">
        <div className="grid grid-cols-[1fr,auto,auto] items-center gap-2">
          <Input
            placeholder="Item name"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Amount"
            className="w-24"
            value={newItemAmount || ''}
            onChange={(e) => setNewItemAmount(Number(e.target.value))}
          />
          <Button size="sm" onClick={handleAddItem}>
            Add
          </Button>
        </div>

        <div className="space-y-1">
          {category?.items?.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-md bg-muted/50 p-2"
            >
              <span>{item.name}</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {formatCurrency(item.amount)}
                </span>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8"
                  onClick={() => handleDeleteItem(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const handleUpdateItems = (categoryId: number, items: BudgetItem[]) => {
    if (!editedPlan) return;

    const updatedPlan = {
      ...editedPlan,
      categories: editedPlan.categories.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              items,
              allocated: items.reduce((sum, item) => sum + item.amount, 0),
            }
          : category,
      ),
    };
    setEditedPlan(updatedPlan);
  };

  if (!selectedPlan) {
    return (
      <Card className="text-center">
        <CardContent className="p-6">
          <p className="mb-4 text-muted-foreground">No budget plan selected</p>
          <Dialog
            open={isCreateDialogOpen}
            onOpenChange={setIsCreateDialogOpen}
          >
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create New Plan
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Budget Plan</DialogTitle>
              </DialogHeader>
              <CreatePlanForm
                onSubmit={handleCreateNewPlan}
                onCancel={() => setIsCreateDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>
          {selectedPlan.month} {selectedPlan.year}
        </CardTitle>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrevious}
            disabled={currentIndex <= 0}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Dialog
            open={isCreateDialogOpen}
            onOpenChange={setIsCreateDialogOpen}
          >
            <DialogTrigger asChild>
              <Button variant="outline" size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Budget Plan</DialogTitle>
              </DialogHeader>
              <CreatePlanForm
                onSubmit={handleCreateNewPlan}
                onCancel={() => setIsCreateDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>
          <Button
            variant="outline"
            size="icon"
            onClick={handleNext}
            disabled={currentIndex >= plans.length - 1}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <p>Categories: {selectedPlan.categories.length}</p>
          </div>
          <div className="flex space-x-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">
                  <Pencil className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full max-w-md overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Edit Budget Plan</SheetTitle>
                </SheetHeader>
                {editedPlan && (
                  <div className="py-4">
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Monthly Income
                    </label>
                    <Input
                      type="number"
                      value={editedPlan.income}
                      onChange={(e) =>
                        setEditedPlan({
                          ...editedPlan,
                          income: Number.parseFloat(e.target.value) || 0,
                        })
                      }
                      className="mb-4"
                    />

                    <div className="space-y-6">
                      {editedPlan.categories.map((category) => (
                        <div key={category.id} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">{category.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                Total: {formatCurrency(category.allocated)}
                              </p>
                            </div>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => handleDeleteCategory(category.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="border-l-2 border-muted pl-4">
                            <CategoryItemsList
                              category={category}
                              onUpdateItems={handleUpdateItems}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 space-y-4">
                      <AddCategoryDialog onAddCategory={handleAddCategory} />
                      <Button onClick={handleSaveEdit} className="w-full">
                        Save Changes
                      </Button>
                    </div>
                  </div>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
