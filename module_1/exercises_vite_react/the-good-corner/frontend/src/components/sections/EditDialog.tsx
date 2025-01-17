import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface EditDialogProps {
    isOpen: boolean;
    onClose: () => void;
    editingItem: { id: string; type: "category" | "tag"; title: string; } | null;
    newItemName: string;
    setNewItemName: (value: string) => void;
    handleUpdate: (type: "category" | "tag") => Promise<void>;
}

export function EditDialog({ isOpen, onClose, editingItem, newItemName, setNewItemName, handleUpdate }: EditDialogProps) {
    if (!editingItem) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="border-red-900/20 text-card-foreground">
                <DialogHeader>
                    <DialogTitle>EDIT_{editingItem.type.toUpperCase()}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <Input
                        placeholder={`Update ${editingItem.type}`}
                        value={newItemName}
                        onChange={(e) => setNewItemName(e.target.value)}
                        className="bg-black/50 border-red-900/20 text-chart-3"
                    />
                    <Button onClick={() => handleUpdate(editingItem.type)} className="w-full bg-accent hover:bg-border">
                        CONFIRM_UPDATE
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
