import { Button } from "@/components/ui/button";
import { Edit, Trash2, Star } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Currency {
  id: string;
  code: string;
  symbol: string;
  name: string;
  exchange_rate: number;
  is_default: boolean;
}

interface CurrencyTableProps {
  currencies: Currency[];
  onEdit: (currency: Currency) => void;
  onDelete: (id: string) => void;
}

const CurrencyTable = ({ currencies, onEdit, onDelete }: CurrencyTableProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Code</TableHead>
            <TableHead>Symbole</TableHead>
            <TableHead>Nom</TableHead>
            <TableHead>Taux de change</TableHead>
            <TableHead>Par défaut</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currencies.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                Aucune devise trouvée
              </TableCell>
            </TableRow>
          ) : (
            currencies.map((currency) => (
              <TableRow key={currency.id}>
                <TableCell className="font-medium">{currency.code}</TableCell>
                <TableCell>{currency.symbol}</TableCell>
                <TableCell>{currency.name}</TableCell>
                <TableCell>{Number(currency.exchange_rate).toFixed(2)}</TableCell>
                <TableCell>
                  {currency.is_default && (
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(currency)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onDelete(currency.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CurrencyTable;
