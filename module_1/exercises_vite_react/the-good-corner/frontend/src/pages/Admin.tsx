import { useEffect, useState } from "react"
import { Plus, Tags, FolderTree, Trash2, Edit2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { useMutation, useQuery } from "@apollo/client"
import { CREATE_TAG, GET_TAGS, UPDATE_TAG, DELETE_TAG } from "@/graphql/tags"
import { DELETE_CATEGORY, GET_CATEGORIES, CREATE_CATEGORY, UPDATE_CATEGORY } from "@/graphql/categories"
import ErrorElement from "@/components/ErrorElement"
import { Tag } from "@/types/tag"
import { Category } from "@/types/category"
import { AdminHeader } from "@/components/sections/AdminHeader"
import { DeleteDialog } from "@/components/sections/DeleteDialog"
import { EditDialog } from "@/components/sections/EditDialog"
import { StatsCards } from "@/components/sections/StatsCards"

export default function AdminDashboard() {
    const [newItemName, setNewItemName] = useState("")
    const [editingItem, setEditingItem] = useState<{ id: string; type: "category" | "tag"; title: string } | null>(null)
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [itemToDelete, setItemToDelete] = useState<{ id: string; type: "category" | "tag" } | null>(null)
    const [categories, setCategories] = useState<Category[]>([]);
    const [tags, setTags] = useState<Tag[]>([]);

    // Get categories from the database
    const { data: categoriesData, loading: categoriesLoading, error: categoriesError, refetch: refetchCategories } = useQuery(GET_CATEGORIES, {
        fetchPolicy: "network-only",
    });

    // Get tags from the database
    const { data: tagsData, loading: tagsLoading, error: tagsError, refetch: refetchTags } = useQuery(GET_TAGS, {
        fetchPolicy: "network-only",
    });

    // mutations
    const [createCategory] = useMutation(CREATE_CATEGORY);
    const [updateCategory] = useMutation(UPDATE_CATEGORY);
    const [deleteCategory] = useMutation(DELETE_CATEGORY);

    const [createTag] = useMutation(CREATE_TAG);
    const [updateTag] = useMutation(UPDATE_TAG);
    const [deleteTag] = useMutation(DELETE_TAG);

    // Sync data with local state
    useEffect(() => {
        if (categoriesData) {
            setCategories(categoriesData.categories);
        }
    }, [categoriesData]);

    useEffect(() => {
        if (tagsData) {
            setTags(tagsData.tags);
        }
    }, [tagsData]);

    // handle creation
    const handleCreate = async (type: "category" | "tag") => {
        if (!newItemName) return

        try {
            if (type === "category") {
                await createCategory({ variables: { data: { title: newItemName } } });
                refetchCategories();
            } else if (type === "tag") {
                await createTag({ variables: { data: { title: newItemName } } });
                refetchTags();
            }
            setNewItemName("");
        } catch (error) {
            console.error("Error creating item:", error);
        }
    };

    // handle update
    const handleUpdate = async () => {
        if (!editingItem) return

        try {
            if (editingItem.type === "category") {
                await updateCategory({
                    variables: {
                        updateCategoryId: parseInt(editingItem.id),
                        data: { title: newItemName },
                    },
                });
                refetchCategories();
            } else if (editingItem.type === "tag") {
                await updateTag({
                    variables: {
                        updateTagId: parseInt(editingItem.id),
                        data: { title: newItemName },
                    },
                });
                refetchTags();
            }

            setEditingItem(null);
            setNewItemName("");
        } catch (error) {
            console.error("Error updating item:", error);
        }
    }

    // handle delete
    const handleDelete = (id: string, type: "category" | "tag") => {
        setItemToDelete({ id, type });
        setDeleteDialogOpen(true);
    };

    // Confirm delete action
    const confirmDelete = async () => {
        if (itemToDelete) {
            try {
                if (itemToDelete.type === "category") {
                    await deleteCategory({ variables: { deleteCategoryId: parseInt(itemToDelete.id) } });
                    refetchCategories();
                } else if (itemToDelete.type === "tag") {
                    await deleteTag({ variables: { deleteTagId: parseInt(itemToDelete.id) } });
                    refetchTags();
                }
            } catch (error) {
                console.error("Error deleting item:", error);
            } finally {
                setDeleteDialogOpen(false);
                setItemToDelete(null);
            }
        }
    };

    if (categoriesError || tagsError) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black text-accent">
                <ErrorElement />
            </div>
        );
    }

    return (
        <div className="min-h-screen backdrop-blur-sm">
            <div className="relative z-10">

                {/* Header */}
                <AdminHeader />

                {/* Main Content */}
                <main className="container mx-auto p-4">
                    {/* Stats Cards */}
                    <StatsCards
                        categoriesCount={categories.length}
                        tagsCount={tags.length}
                        productsCount={categories.length + tags.length}
                        categoriesLoading={categoriesLoading}
                        tagsLoading={tagsLoading}
                    />

                    {/* Management Interface */}
                    <Tabs defaultValue="categories" className="space-y-4">
                        {/* Section Tabs */}
                        <TabsList className="bg-black border border-red-900/20">
                            <TabsTrigger value="categories" className="data-[state=active]:bg-primary-foreground data-[state=active]:text-chart-3">
                                <FolderTree className="h-4 w-4 mr-2" />
                                CATEGORIES
                            </TabsTrigger>
                            <TabsTrigger value="tags" className="data-[state=active]:bg-primary-foreground data-[state=active]:text-chart-3">
                                <Tags className="h-4 w-4 mr-2" />
                                TAGS
                            </TabsTrigger>
                        </TabsList>

                        {/* Categories Management */}
                        <TabsContent value="categories">
                            {categoriesLoading ? (
                                <div>Loading...</div>
                            ) : (
                                <Card className="bg-black border-red-900/20">
                                    <CardHeader className="flex flex-row items-center justify-between">
                                        <CardTitle>MANAGE_CATEGORIES</CardTitle>
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="outline" className="border-red-900/20 hover:bg-primary-foreground">
                                                    <Plus className="h-4 w-4 mr-2" />
                                                    ADD_CATEGORY
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="border-red-900/20 text-card-foreground">
                                                <DialogHeader>
                                                    <DialogTitle>CREATE_NEW_CATEGORY</DialogTitle>
                                                </DialogHeader>
                                                <div className="space-y-4">
                                                    <Input
                                                        placeholder="Category Name"
                                                        value={newItemName}
                                                        onChange={(e) => setNewItemName(e.target.value)}
                                                        className="bg-black/50 border-red-900/20 text-chart-3"
                                                    />
                                                    <Button
                                                        onClick={() => handleCreate("category")}
                                                        className="w-full bg-accent hover:bg-border"
                                                    >
                                                        CONFIRM_CREATE
                                                    </Button>
                                                </div>
                                            </DialogContent>
                                        </Dialog>
                                    </CardHeader>
                                    <CardContent className="max-h-80 overflow-y-auto">
                                        <div className="space-y-2">
                                            {categories.map((category: Category) => (
                                                <div
                                                    key={category.id}
                                                    className="flex items-center justify-between p-3 border border-red-900/20 bg-black/30 rounded-md"
                                                >
                                                    <div className="flex items-center space-x-4">
                                                        <span className="text-accent">[{category.id || 0}]</span>
                                                        <span>{category.title}</span>
                                                    </div>
                                                    <div className="flex space-x-2">
                                                        <Button variant="outline" size="icon" className="border-red-900/20 hover:bg-primary-foreground" onClick={() => {
                                                            setEditingItem({
                                                                id: category.id,
                                                                type: "category",
                                                                title: category.title
                                                            });
                                                            setNewItemName(category.title);
                                                        }}>
                                                            <Edit2 className="h-4 w-4" />
                                                        </Button>
                                                        <Button variant="outline" size="icon" className="border-red-900/20 hover:bg-primary-foreground" onClick={() => handleDelete(category.id, "category")}>
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                        </TabsContent>

                        {/* Tags Management */}
                        <TabsContent value="tags">
                            {tagsLoading ? (
                                <div>Loading...</div>
                            ) : (
                                <Card className="bg-black border-red-900/20">
                                    <CardHeader className="flex flex-row items-center justify-between">
                                        <CardTitle>MANAGE_TAGS</CardTitle>
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="outline" className="border-red-900/20 hover:bg-primary-foreground">
                                                    <Plus className="h-4 w-4 mr-2" />
                                                    ADD_TAG
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="border-red-900/20 text-card-foreground">
                                                <DialogHeader>
                                                    <DialogTitle>CREATE_NEW_TAG</DialogTitle>
                                                </DialogHeader>
                                                <div className="space-y-4">
                                                    <Input
                                                        placeholder="Tag Name"
                                                        value={newItemName}
                                                        onChange={(e) => setNewItemName(e.target.value)}
                                                        className="border-red-900/20 text-chart-3"
                                                    />
                                                    <Button className="w-full bg-accent hover:bg-border" onClick={() => handleCreate("tag")}>
                                                        CONFIRM_CREATE
                                                    </Button>
                                                </div>
                                            </DialogContent>
                                        </Dialog>
                                    </CardHeader>
                                    <CardContent className="max-h-80 overflow-y-auto">
                                        <div className="space-y-2">
                                            {tags.map((tag: Tag) => (
                                                <div
                                                    key={tag.id}
                                                    className="flex items-center justify-between p-3 border border-red-900/20 bg-black/30 rounded-md"
                                                >
                                                    <div className="flex items-center space-x-4">
                                                        <span className="text-accent">[{tag.id || 0}]</span>
                                                        <span>{tag.title}</span>
                                                    </div>
                                                    <div className="flex space-x-2">
                                                        <Button variant="outline" size="icon" className="border-red-900/20 hover:bg-primary-foreground" onClick={() => {
                                                            setEditingItem({
                                                                id: tag.id,
                                                                type: "tag",
                                                                title: tag.title
                                                            });
                                                            setNewItemName(tag.title);
                                                        }}>
                                                            <Edit2 className="h-4 w-4" />
                                                        </Button>
                                                        <Button variant="outline" size="icon" className="border-red-900/20 hover:bg-primary-foreground" onClick={() => handleDelete(tag.id, "tag")}>
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                        </TabsContent>
                    </Tabs>
                </main>
            </div>

            {/* Edit Dialog */}
            <EditDialog
                isOpen={!!editingItem}
                onClose={() => setEditingItem(null)}
                editingItem={editingItem}
                newItemName={newItemName}
                setNewItemName={setNewItemName}
                handleUpdate={handleUpdate}
            />

            {/* Dialog for delete confirmation */}
            <DeleteDialog isOpen={isDeleteDialogOpen} onClose={() => setDeleteDialogOpen(false)} onConfirm={confirmDelete} />
        </div>
    )
}
