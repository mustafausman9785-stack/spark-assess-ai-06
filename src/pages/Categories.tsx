
import { useState } from 'react';
import { Plus, Eye, Edit, Trash2, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Category {
  id: number;
  name: string;
  description: string;
  assessmentCount: number;
  dateCreated: string;
  colorTag: string;
  status: 'active' | 'inactive';
  totalParticipants: number;
  avgScore: number;
}

const Categories = () => {
  const [showNewCategoryModal, setShowNewCategoryModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
    colorTag: '#2563EB'
  });

  const categories: Category[] = [
    { 
      id: 1, 
      name: 'Programming', 
      description: 'Software development and coding assessments',
      assessmentCount: 25, 
      dateCreated: '2024-01-15',
      colorTag: '#2563EB',
      status: 'active',
      totalParticipants: 456,
      avgScore: 82.5
    },
    { 
      id: 2, 
      name: 'Cybersecurity', 
      description: 'Information security and cyber defense evaluations',
      assessmentCount: 18, 
      dateCreated: '2024-02-03',
      colorTag: '#DC2626',
      status: 'active',
      totalParticipants: 234,
      avgScore: 75.3
    },
    { 
      id: 3, 
      name: 'Data Science', 
      description: 'Analytics, machine learning and data analysis tests',
      assessmentCount: 22, 
      dateCreated: '2024-01-28',
      colorTag: '#059669',
      status: 'active',
      totalParticipants: 345,
      avgScore: 78.9
    },
    { 
      id: 4, 
      name: 'Project Management', 
      description: 'Leadership and project coordination assessments',
      assessmentCount: 15, 
      dateCreated: '2024-02-10',
      colorTag: '#7C3AED',
      status: 'active',
      totalParticipants: 189,
      avgScore: 71.2
    },
    { 
      id: 5, 
      name: 'Marketing', 
      description: 'Digital marketing and brand strategy evaluations',
      assessmentCount: 12, 
      dateCreated: '2024-02-20',
      colorTag: '#EA580C',
      status: 'inactive',
      totalParticipants: 123,
      avgScore: 74.6
    },
  ];

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateCategory = () => {
    console.log('Creating category:', newCategory);
    setShowNewCategoryModal(false);
    setNewCategory({ name: '', description: '', colorTag: '#2563EB' });
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-ai-gray-900">Categories</h1>
          <p className="text-ai-gray-600 mt-1">Organize and manage your assessment categories</p>
        </div>
        
        <Dialog open={showNewCategoryModal} onOpenChange={setShowNewCategoryModal}>
          <DialogTrigger asChild>
            <Button className="bg-ai-blue hover:bg-ai-blue-600 w-full sm:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              New Category
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Category</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Category Name *</Label>
                <Input
                  id="name"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  placeholder="Enter category name"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                  placeholder="Describe this category"
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="colorTag">Color Tag</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="colorTag"
                    type="color"
                    value={newCategory.colorTag}
                    onChange={(e) => setNewCategory({ ...newCategory, colorTag: e.target.value })}
                    className="w-16 h-10"
                  />
                  <Input
                    value={newCategory.colorTag}
                    onChange={(e) => setNewCategory({ ...newCategory, colorTag: e.target.value })}
                    placeholder="#2563EB"
                    className="flex-1"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setShowNewCategoryModal(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateCategory} className="bg-ai-blue hover:bg-ai-blue-600">
                  Create Category
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Stats */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-ai-gray-400 w-4 h-4" />
          <Input
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>Active: {categories.filter(c => c.status === 'active').length}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
            <span>Inactive: {categories.filter(c => c.status === 'inactive').length}</span>
          </div>
        </div>
      </div>

      {/* Categories Table */}
      <Card className="border-ai-gray-200">
        <CardHeader>
          <CardTitle className="text-ai-gray-900 flex items-center justify-between">
            <span>All Categories</span>
            <Badge variant="outline">{filteredCategories.length} categories</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">Description</TableHead>
                  <TableHead>Assessments</TableHead>
                  <TableHead className="hidden lg:table-cell">Participants</TableHead>
                  <TableHead className="hidden lg:table-cell">Avg Score</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCategories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-4 h-4 rounded"
                          style={{ backgroundColor: category.colorTag }}
                        ></div>
                        <div>
                          <div className="font-medium">{category.name}</div>
                          <div className="text-sm text-ai-gray-500 md:hidden">
                            {category.description.length > 50 
                              ? `${category.description.substring(0, 50)}...` 
                              : category.description
                            }
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="max-w-xs">
                        {category.description}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{category.assessmentCount}</Badge>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {category.totalParticipants.toLocaleString()}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <div className="flex items-center gap-2">
                        <span>{category.avgScore}%</span>
                        <div className="w-12 bg-ai-gray-200 rounded-full h-2">
                          <div 
                            className="bg-ai-blue h-2 rounded-full" 
                            style={{ width: `${category.avgScore}%` }}
                          ></div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(category.status)}>
                        {category.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setSelectedCategory(category)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Category Details Modal */}
      {selectedCategory && (
        <Dialog open={true} onOpenChange={() => setSelectedCategory(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <div 
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: selectedCategory.colorTag }}
                ></div>
                {selectedCategory.name}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-2">Description</h4>
                <p className="text-ai-gray-600">{selectedCategory.description}</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-ai-blue-light p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-ai-blue">{selectedCategory.assessmentCount}</div>
                  <div className="text-sm text-ai-gray-600">Assessments</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-600">{selectedCategory.totalParticipants}</div>
                  <div className="text-sm text-ai-gray-600">Participants</div>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-orange-600">{selectedCategory.avgScore}%</div>
                  <div className="text-sm text-ai-gray-600">Avg Score</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg text-center">
                  <Badge className={getStatusColor(selectedCategory.status)}>
                    {selectedCategory.status}
                  </Badge>
                  <div className="text-sm text-ai-gray-600 mt-1">Status</div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Details</h4>
                <div className="bg-ai-gray-50 p-4 rounded-lg space-y-2">
                  <div className="flex justify-between">
                    <span className="text-ai-gray-600">Created:</span>
                    <span>{new Date(selectedCategory.dateCreated).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ai-gray-600">Color Tag:</span>
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-4 h-4 rounded border"
                        style={{ backgroundColor: selectedCategory.colorTag }}
                      ></div>
                      <span className="text-sm font-mono">{selectedCategory.colorTag}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setSelectedCategory(null)}>
                  Close
                </Button>
                <Button className="bg-ai-blue hover:bg-ai-blue-600">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Category
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Categories;
