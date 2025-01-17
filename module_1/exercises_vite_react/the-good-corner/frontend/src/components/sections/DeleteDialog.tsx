import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DeleteDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export function DeleteDialog({ isOpen, onClose, onConfirm }: DeleteDialogProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="border-red-900/20 text-card-foreground">
                <DialogHeader>
                    <DialogTitle>CONFIRM_DELETE</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <p>Êtes-vous sûr de vouloir supprimer cet élément ? Cette action est irréversible.</p>
                    <div className="flex space-x-2">
                        <Button onClick={onConfirm} className="bg-accent hover:bg-border">
                            CONFIRM
                        </Button>
                        <Button onClick={onClose} className="bg-muted-foreground hover:bg-muted">
                            CANCEL
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
