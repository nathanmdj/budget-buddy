'use client';

import { useState } from 'react';

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

import { AddCategoryDialog } from './AddCategoryDialog';
import { CreatePlanForm } from './CreatePlanForm';
import type { BudgetCategory, BudgetPlan } from './types';

type Props = {
  plans: BudgetPlan[];
  selectedPlan: BudgetPlan | null;
  onSelectPlan: (id: number) => void;
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
  const [editedPlan, setEditedPlan] = useState<BudgetPlan | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

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

  const handleEditCategory = (editedCategory: BudgetCategory) => {
    if (!editedPlan) return;
    const updatedPlan = {
      ...editedPlan,
      categories: editedPlan.categories.map((category) =>
        category.id === editedCategory.id ? editedCategory : category,
      ),
    };
    setEditedPlan(updatedPlan);
  };

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
    setEditedPlan(null);
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
              <SheetContent>
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
                    <h3 className="mb-2 font-semibold">Categories</h3>
                    {editedPlan.categories.map((category) => (
                      <div
                        key={category.id}
                        className="mb-2 flex items-center justify-between"
                      >
                        <span>{category.name}</span>
                        <div className="flex items-center space-x-2">
                          <Input
                            type="number"
                            value={category.allocated}
                            onChange={(e) =>
                              handleEditCategory({
                                ...category,
                                allocated:
                                  Number.parseFloat(e.target.value) || 0,
                              })
                            }
                            className="w-24"
                          />
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleDeleteCategory(category.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    <AddCategoryDialog onAddCategory={handleAddCategory} />
                    <Button onClick={handleSaveEdit} className="mt-4 w-full">
                      Save Changes
                    </Button>
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
