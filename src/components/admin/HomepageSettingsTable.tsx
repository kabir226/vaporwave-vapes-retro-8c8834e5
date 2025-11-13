import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Image as ImageIcon, Video, GripVertical } from 'lucide-react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface HomepageSetting {
  id: string;
  section_name: string;
  title?: string;
  subtitle?: string;
  description?: string;
  image_url?: string;
  video_url?: string;
  button_text?: string;
  button_link?: string;
  is_active: boolean;
  display_order: number;
}

interface HomepageSettingsTableProps {
  settings: HomepageSetting[];
  loading: boolean;
  onEdit: (setting: HomepageSetting) => void;
  onDelete: (id: string) => void;
  onReorder: (settings: HomepageSetting[]) => void;
}

interface SortableRowProps {
  setting: HomepageSetting;
  onEdit: (setting: HomepageSetting) => void;
  onDelete: (id: string) => void;
}

const SortableRow: React.FC<SortableRowProps> = ({ setting, onEdit, onDelete }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: setting.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <TableRow ref={setNodeRef} style={style}>
      <TableCell>
        <div className="flex items-center gap-2">
          <button
            className="cursor-grab active:cursor-grabbing touch-none"
            {...attributes}
            {...listeners}
          >
            <GripVertical className="w-4 h-4 text-muted-foreground" />
          </button>
          <span>{setting.display_order}</span>
        </div>
      </TableCell>
      <TableCell className="font-medium">{setting.section_name}</TableCell>
      <TableCell>{setting.title || '-'}</TableCell>
      <TableCell>
        <div className="flex gap-2">
          {setting.image_url && (
            <Badge variant="secondary">
              <ImageIcon className="w-3 h-3 mr-1" />
              Image
            </Badge>
          )}
          {setting.video_url && (
            <Badge variant="secondary">
              <Video className="w-3 h-3 mr-1" />
              Vidéo
            </Badge>
          )}
        </div>
      </TableCell>
      <TableCell>
        <Badge variant={setting.is_active ? 'default' : 'secondary'}>
          {setting.is_active ? 'Active' : 'Inactive'}
        </Badge>
      </TableCell>
      <TableCell>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(setting)}
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(setting.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

const HomepageSettingsTable: React.FC<HomepageSettingsTableProps> = ({
  settings,
  loading,
  onEdit,
  onDelete,
  onReorder,
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = settings.findIndex((s) => s.id === active.id);
      const newIndex = settings.findIndex((s) => s.id === over.id);

      const reordered = arrayMove(settings, oldIndex, newIndex).map(
        (setting, index) => ({
          ...setting,
          display_order: index + 1,
        })
      );

      onReorder(reordered);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Chargement...</div>;
  }

  if (settings.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Aucune section configurée
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ordre</TableHead>
              <TableHead>Section</TableHead>
              <TableHead>Titre</TableHead>
              <TableHead>Médias</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <SortableContext
              items={settings.map((s) => s.id)}
              strategy={verticalListSortingStrategy}
            >
              {settings.map((setting) => (
                <SortableRow
                  key={setting.id}
                  setting={setting}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
            </SortableContext>
          </TableBody>
        </Table>
      </div>
    </DndContext>
  );
};

export default HomepageSettingsTable;
