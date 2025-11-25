import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import {
  Upload,
  FileText,
  Trash2,
  Edit,
  Save,
  Loader2,
  Download,
  Eye,
  GripVertical,
} from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

/**
 * Admin Resource Manager
 * 
 * Visual UI for managing lead magnet resources:
 * - Upload new PDFs and thumbnails
 * - Edit titles, descriptions, categories
 * - Drag-and-drop reordering
 * - Toggle active/inactive status
 * - Delete resources
 * - View download statistics
 */

interface ResourceFormData {
  title: string;
  description: string;
  type: string;
  category: string;
  fileUrl: string;
  thumbnailUrl: string;
  fileSize: number;
  sortOrder: number;
}

interface ResourceItemProps {
  magnet: any;
  onToggleActive: (id: number, currentStatus: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  getCategoryBadge: (category: string) => React.ReactElement;
}

function SortableResourceItem({
  magnet,
  onToggleActive,
  onEdit,
  onDelete,
  getCategoryBadge,
}: ResourceItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: magnet.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Card ref={setNodeRef} style={style} className="p-6">
      <div className="flex gap-6">
        {/* Drag Handle */}
        <div
          className="flex-shrink-0 flex items-center cursor-grab active:cursor-grabbing"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="h-5 w-5 text-muted-foreground" />
        </div>

        {/* Thumbnail */}
        <div className="flex-shrink-0">
          {magnet.thumbnailUrl ? (
            <img
              src={magnet.thumbnailUrl}
              alt={magnet.title}
              className="w-32 h-24 object-cover rounded"
            />
          ) : (
            <div className="w-32 h-24 bg-muted rounded flex items-center justify-center">
              <FileText className="h-8 w-8 text-muted-foreground" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 space-y-3">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-semibold">{magnet.title}</h3>
                {getCategoryBadge(magnet.category)}
                <span className="text-sm text-muted-foreground">
                  {magnet.type.toUpperCase()}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {magnet.description}
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Switch
                checked={magnet.isActive === 1}
                onCheckedChange={() => onToggleActive(magnet.id, magnet.isActive)}
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.open(magnet.fileUrl, "_blank")}
              >
                <Eye className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(magnet.id)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(magnet.id)}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              <span>{magnet.downloadCount} downloads</span>
            </div>
            {magnet.fileSize && (
              <span>{Math.round(magnet.fileSize / 1024)} MB</span>
            )}
            <span>Sort Order: {magnet.sortOrder}</span>
            <span className={magnet.isActive === 1 ? "text-green-600" : "text-red-600"}>
              {magnet.isActive === 1 ? "Active" : "Inactive"}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default function AdminResources() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [uploadingThumbnail, setUploadingThumbnail] = useState(false);
  const [localMagnets, setLocalMagnets] = useState<any[]>([]);

  const [formData, setFormData] = useState<ResourceFormData>({
    title: "",
    description: "",
    type: "pdf",
    category: "roi",
    fileUrl: "",
    thumbnailUrl: "",
    fileSize: 0,
    sortOrder: 0,
  });

  const { data: magnets, isLoading, refetch } = trpc.leadMagnets.adminGetAll.useQuery();

  useEffect(() => {
    if (magnets) {
      setLocalMagnets(magnets);
    }
  }, [magnets]);
  const createMutation = trpc.leadMagnets.adminCreate.useMutation();
  const updateMutation = trpc.leadMagnets.adminUpdate.useMutation();
  const deleteMutation = trpc.leadMagnets.adminDelete.useMutation();
  const uploadFileMutation = trpc.fileUpload.uploadFile.useMutation();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const oldIndex = localMagnets.findIndex((m) => m.id === active.id);
    const newIndex = localMagnets.findIndex((m) => m.id === over.id);

    const newOrder = arrayMove(localMagnets, oldIndex, newIndex);
    setLocalMagnets(newOrder);

    // Update sortOrder for all affected items
    try {
      for (let i = 0; i < newOrder.length; i++) {
        if (newOrder[i].sortOrder !== i) {
          await updateMutation.mutateAsync({
            id: newOrder[i].id,
            sortOrder: i,
          });
        }
      }
      toast.success("Resources reordered successfully");
      refetch();
    } catch (error: any) {
      toast.error("Failed to reorder resources", {
        description: error.message,
      });
      setLocalMagnets(magnets || []);
    }
  };

  const handleFileUpload = async (file: File, isThumbnail: boolean) => {
    if (isThumbnail) {
      setUploadingThumbnail(true);
    } else {
      setUploadingFile(true);
    }

    try {
      // Read file as base64
      const reader = new FileReader();
      reader.readAsDataURL(file);

      await new Promise((resolve, reject) => {
        reader.onload = async () => {
          try {
            const base64Data = (reader.result as string).split(",")[1];

            const result = await uploadFileMutation.mutateAsync({
              fileName: file.name,
              fileType: file.type,
              fileData: base64Data,
              folder: isThumbnail ? "thumbnails" : "resources",
            });

            if (isThumbnail) {
              setFormData({ ...formData, thumbnailUrl: result.url });
            } else {
              setFormData({
                ...formData,
                fileUrl: result.url,
                fileSize: Math.round(file.size / 1024), // Convert to KB
              });
            }

            toast.success(`${isThumbnail ? "Thumbnail" : "File"} uploaded successfully`);
            resolve(result);
          } catch (error: any) {
            toast.error("Upload failed", {
              description: error.message,
            });
            reject(error);
          }
        };

        reader.onerror = reject;
      });
    } catch (error) {
      console.error("File upload error:", error);
    } finally {
      if (isThumbnail) {
        setUploadingThumbnail(false);
      } else {
        setUploadingFile(false);
      }
    }
  };

  const handleCreate = async () => {
    if (!formData.title || !formData.description || !formData.fileUrl) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      await createMutation.mutateAsync({
        title: formData.title,
        description: formData.description,
        type: formData.type,
        category: formData.category,
        fileUrl: formData.fileUrl,
        thumbnailUrl: formData.thumbnailUrl || undefined,
        fileSize: formData.fileSize || undefined,
        sortOrder: localMagnets.length,
      });

      toast.success("Resource created successfully");
      setIsCreateDialogOpen(false);
      setFormData({
        title: "",
        description: "",
        type: "pdf",
        category: "roi",
        fileUrl: "",
        thumbnailUrl: "",
        fileSize: 0,
        sortOrder: 0,
      });
      refetch();
    } catch (error: any) {
      toast.error("Failed to create resource", {
        description: error.message,
      });
    }
  };

  const handleToggleActive = async (id: number, currentStatus: number) => {
    try {
      await updateMutation.mutateAsync({
        id,
        isActive: currentStatus === 1 ? 0 : 1,
      });

      toast.success(`Resource ${currentStatus === 1 ? "deactivated" : "activated"}`);
      refetch();
    } catch (error: any) {
      toast.error("Failed to update status", {
        description: error.message,
      });
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      await deleteMutation.mutateAsync({ id: deleteId });
      toast.success("Resource deleted successfully");
      setDeleteId(null);
      refetch();
    } catch (error: any) {
      toast.error("Failed to delete resource", {
        description: error.message,
      });
    }
  };

  const getCategoryBadge = (category: string) => {
    const colors: Record<string, string> = {
      roi: "bg-green-100 text-green-800",
      compliance: "bg-blue-100 text-blue-800",
      staffing: "bg-purple-100 text-purple-800",
      operations: "bg-orange-100 text-orange-800",
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[category] || "bg-gray-100 text-gray-800"}`}>
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Resource Manager</h1>
              <p className="text-muted-foreground mt-1">
                Manage lead magnet resources, upload files, and track downloads
              </p>
            </div>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <Upload className="h-4 w-4 mr-2" />
              Add New Resource
            </Button>
          </div>
        </div>
      </div>

      {/* Resources List */}
      <div className="container py-8">
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : localMagnets && localMagnets.length > 0 ? (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={localMagnets.map((m) => m.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-4">
                {localMagnets.map((magnet) => (
                  <SortableResourceItem
                    key={magnet.id}
                    magnet={magnet}
                    onToggleActive={handleToggleActive}
                    onEdit={setEditingId}
                    onDelete={setDeleteId}
                    getCategoryBadge={getCategoryBadge}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        ) : (
          <div className="text-center py-20">
            <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No resources yet</h3>
            <p className="text-muted-foreground mb-6">
              Get started by adding your first lead magnet resource
            </p>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <Upload className="h-4 w-4 mr-2" />
              Add New Resource
            </Button>
          </div>
        )}
      </div>

      {/* Create Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Resource</DialogTitle>
            <DialogDescription>
              Upload a new lead magnet resource with PDF file and optional thumbnail
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">
                Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="ROI Calculator & Implementation Guide"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">
                Description <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Comprehensive guide showing how HarmonyCare delivers 40% cost savings..."
                rows={4}
              />
            </div>

            {/* Type and Category */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => setFormData({ ...formData, type: value })}
                >
                  <SelectTrigger id="type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="checklist">Checklist</SelectItem>
                    <SelectItem value="guide">Guide</SelectItem>
                    <SelectItem value="playbook">Playbook</SelectItem>
                    <SelectItem value="template">Template</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger id="category">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="roi">ROI</SelectItem>
                    <SelectItem value="compliance">Compliance</SelectItem>
                    <SelectItem value="staffing">Staffing</SelectItem>
                    <SelectItem value="operations">Operations</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* File Upload */}
            <div className="space-y-2">
              <Label>
                PDF File <span className="text-destructive">*</span>
              </Label>
              <div className="flex items-center gap-3">
                <Input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file, false);
                  }}
                  disabled={uploadingFile}
                />
                {uploadingFile && <Loader2 className="h-4 w-4 animate-spin" />}
              </div>
              {formData.fileUrl && (
                <p className="text-sm text-green-600">✓ File uploaded successfully</p>
              )}
            </div>

            {/* Thumbnail Upload */}
            <div className="space-y-2">
              <Label>Thumbnail Image (Optional)</Label>
              <div className="flex items-center gap-3">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file, true);
                  }}
                  disabled={uploadingThumbnail}
                />
                {uploadingThumbnail && <Loader2 className="h-4 w-4 animate-spin" />}
              </div>
              {formData.thumbnailUrl && (
                <div className="mt-2">
                  <img
                    src={formData.thumbnailUrl}
                    alt="Thumbnail preview"
                    className="w-32 h-24 object-cover rounded"
                  />
                </div>
              )}
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button
              variant="outline"
              onClick={() => setIsCreateDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreate}
              disabled={createMutation.isPending || uploadingFile || uploadingThumbnail}
            >
              {createMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Create Resource
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Resource?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the resource
              and all associated download records.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
