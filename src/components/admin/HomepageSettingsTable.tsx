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
import { Edit, Trash2, Image as ImageIcon, Video } from 'lucide-react';

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
              <Image className="w-3 h-3 mr-1" />
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
  onDelete
}) => {
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
          {settings.map((setting) => (
            <TableRow key={setting.id}>
              <TableCell>{setting.display_order}</TableCell>
              <TableCell>
                <span className="font-mono text-sm">{setting.section_name}</span>
              </TableCell>
              <TableCell>
                <div className="max-w-xs truncate">{setting.title || '-'}</div>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  {setting.image_url && (
                    <Badge variant="outline" className="gap-1">
                      <ImageIcon className="w-3 h-3" />
                      Image
                    </Badge>
                  )}
                  {setting.video_url && (
                    <Badge variant="outline" className="gap-1">
                      <Video className="w-3 h-3" />
                      Vidéo
                    </Badge>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={setting.is_active ? 'default' : 'secondary'}>
                  {setting.is_active ? 'Actif' : 'Inactif'}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(setting)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(setting.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default HomepageSettingsTable;
