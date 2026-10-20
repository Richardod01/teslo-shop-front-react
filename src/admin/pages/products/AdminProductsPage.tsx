import { Link } from "react-router";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { AdminTitle } from "../../components/AdminTitle";
import { CustomPagination } from "../../../components/custom/CustomPagination";
import { Button } from "../../../components/ui/button";
import { PencilIcon, PlusIcon } from "lucide-react";
import { useProducts } from "../../../shop/hooks/useProducts";
import { CustomFullScreenLoading } from "../../../components/custom/CustomFullScreenLoading";
import { currencyFormatter } from "../../../lib/currency-formater";

export const AdminProductsPage = () => {
  const { data, error, isLoading } = useProducts();

  if (isLoading) {
    return <CustomFullScreenLoading />;
  }

  if (!data || error) {
    return <></>;
  }

  const { products } = data;

  return (
    <>
      <div className="flex justify-between items-center">
        <AdminTitle
          title="Productos"
          subtitle="Aqui puedes ver y administrar tus productos"
        />

        <div className="flex justify-end mb-10 gap-4">
          <Link to="/admin/products/new">
            <Button>
              <PlusIcon />
              Nuevo Producto
            </Button>
          </Link>
        </div>
      </div>

      <Table className="bg-white p-10 shadow-xs border border-gray-200 mb-10">
        <TableHeader>
          <TableRow>
            <TableHead>Imagen</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Tallas</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((prod) => (
            <TableRow key={prod.id}>
              <TableCell>
                <img
                  src={prod.images[0]}
                  alt="Product"
                  className="w-20 h-20 object-cover rounded-b-md"
                />
              </TableCell>
              <TableCell className="hover:text-blue-500 underline cursor-pointer">
                <Link to={`/admin/products/${prod.id}`}>{prod.title}</Link>
              </TableCell>
              <TableCell>{currencyFormatter(prod.price)}</TableCell>
              <TableCell>{prod.gender}</TableCell>
              <TableCell>{prod.stock}</TableCell>
              <TableCell>{prod.sizes.join(", ")}</TableCell>
              <TableCell className="text-right">
                <Link to={`/admin/products/${prod.id}`}>
                  <PencilIcon className="w-4 h-4 text-blue-500" />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <CustomPagination totalPages={data?.pages || 1} />
    </>
  );
};
