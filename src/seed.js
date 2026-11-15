const ago = (min) => new Date(Date.now() - min * 60000).toISOString()

export const seed = {
  products: [
    { id: 1, code: 'PROD-001', barcode: '7791234567890', name: 'Pan Lactal', emoji: '🍞', category: 'Panadería', cost: 900, price: 1500, stock: 2, min: 6 },
    { id: 2, code: 'PROD-002', barcode: '7790895000010', name: 'Gaseosa 1.5L', emoji: '🥤', category: 'Bebidas', cost: 1200, price: 1800, stock: 3, min: 8 },
    { id: 3, code: 'PROD-003', barcode: '7792222333444', name: 'Azúcar 1kg', emoji: '🧂', category: 'Almacén', cost: 800, price: 1200, stock: 5, min: 10 },
    { id: 4, code: 'PROD-004', barcode: '7793333444555', name: 'Yerba 1kg', emoji: '🧉', category: 'Almacén', cost: 2800, price: 3900, stock: 24, min: 6 },
    { id: 5, code: 'PROD-005', barcode: '7794444555666', name: 'Leche 1L', emoji: '🥛', category: 'Lácteos', cost: 1000, price: 1500, stock: 30, min: 10 },
  ],
  movements: [
    { id: 1, type: 'Venta', label: 'N° 000124', date: ago(30), amount: 32500 },
    { id: 2, type: 'Compra', label: 'N° 000056', date: ago(105), amount: 78000 },
    { id: 3, type: 'Cobro', label: 'Cliente: Juan Pérez', date: ago(135), amount: 45000 },
    { id: 4, type: 'Pago', label: 'Proveedor: Distribuidora Sur', date: ago(195), amount: 62000 },
    { id: 5, type: 'Venta', label: 'N° 000123', date: ago(230), amount: 28000 },
  ],
  nextSale: 125,
}
