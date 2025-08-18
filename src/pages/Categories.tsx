
import { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Categories = () => {
  const [showNewCategoryModal, setShowNewCategoryModal] = useState(false);
  const [categories, setCategories] = useState([
    { id: 1, name: 'Cybersecurity', assessments: 45, dateCreated: '2024-01-15', color: '#3B82F6' },
    { id: 2, name: 'Programming', assessments: 78, dateCreated: '2024-01-12', color: '#10B981' },
    { id: 3, name: 'Project Management', assessments: 32, dateCreated: '2024-01-10', color: '#F59E0B' },
    { id: 4, name: 'Data Science', assessments: 23, dateCreated: '2024-01-08', color: '#EF4444' },
    { id: 5, name: 'Digital Marketing', assessments: 19, dateCreated: '2024-01-05', color: '#8B5CF6' },
  ]);

  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
    color: '#3B82F6'
  });

  const handleAddCategory = () => {
    if (newCategory.name.trim()) {
      const category = {
        id: categories.length + 1,
        name: newCategory.name,
        assessments: 0,
        dateCreated: new Date().toISOString().split('T')[0],
        color: newCategory.color
      };
      setCategories([...categories, category]);
      setNewCategory({ name: '', description: '', color: '#3B82F6' });
      setShowNewCategoryModal(false);
    }
  };

  const handleDeleteCategory = (id: number) => {
    setCategories(categories.filter(cat => cat.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-ai-gray-900">Categories</h1>
          <p className="text-ai-gray-600 mt-1">Organize your assessments by categories</p>
        </div>
        
        <Dialog open={showNewCategoryModal} onOpenChange={setShowNewCategoryModal}>
          <DialogTrigger asChild>
            <Button className="bg-ai-blue hover:bg-ai-blue-600">
              <Plus className="w-4 h-4 mr-2" />
              New Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Category</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Category Name</Label>
                <Input
                  id="name"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  placeholder="Enter category name"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                  placeholder="Enter category description"
                />
              </div>
              <div>
                <Label htmlFor="color">Color Tag</Label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    id="color"
                    value={newCategory.color}
                    onChange={(e) => setNewCategory({ ...newCategory, color: e.target.value })}
                    className="w-12 h-10 border border-ai-gray-200 rounded"
                  />
                  <Input
                    value={newCategory.color}
                    onChange={(e) => setNewCategory({ ...newCategory, color: e.target.value })}
                    placeholder="#3B82F6"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowNewCategoryModal(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddCategory} className="bg-ai-blue hover:bg-ai-blue-600">
                  Create Category
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Categories Table */}
      <Card className="border-ai-gray-200">
        <CardHeader>
          <CardTitle className="text-ai-gray-900">All Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-ai-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-ai-gray-700">Name</th>
                  <th className="text-left py-3 px-4 font-medium text-ai-gray-700"># of Assessments</th>
                  <th className="text-left py-3 px-4 font-medium text-ai-gray-700">Date Created</th>
                  <th className="text-left py-3 px-4 font-medium text-ai-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category.id} className="border-b border-ai-gray-100 hover:bg-ai-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: category.color }}
                        ></div>
                        <span className="font-medium text-ai-gray-900">{category.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-ai-gray-600">{category.assessments}</td>
                    <td className="py-3 px-4 text-ai-gray-600">{category.dateCreated}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDeleteCategory(category.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Categories;
