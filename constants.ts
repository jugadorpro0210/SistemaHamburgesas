
import { Product } from './types';

export const BURGERS: Product[] = [
  { id: 'b1', name: 'Grizzly Clásica', description: 'Carne de res premium con queso cheddar y vegetales.', price: 125, category: 'burgers', image: 'https://picsum.photos/seed/burger1/400/300', ingredients: ['Carne 150g', 'Queso Cheddar', 'Lechuga', 'Tomate', 'Cebolla Morada'] },
  { id: 'b2', name: 'Doble Garra', description: 'Doble carne, doble queso y tocino crujiente.', price: 185, category: 'burgers', image: 'https://picsum.photos/seed/burger2/400/300', ingredients: ['Doble Carne', 'Doble Queso', 'Tocino', 'Salsa Especial'] },
  { id: 'b3', name: 'Miel de Oso', description: 'Hamburguesa con salsa honey mustard y aros de cebolla.', price: 145, category: 'burgers', image: 'https://picsum.photos/seed/burger3/400/300', ingredients: ['Carne', 'Aros de cebolla', 'Honey Mustard', 'Tocino'] },
  { id: 'b4', name: 'Bosque Ahumado', description: 'Con salsa BBQ casera y champiñones salteados.', price: 155, category: 'burgers', image: 'https://picsum.photos/seed/burger4/400/300', ingredients: ['Carne', 'Salsa BBQ', 'Champiñones', 'Queso Suizo'] },
  { id: 'b5', name: 'Polar Blue', description: 'Toque elegante con queso azul y cebolla caramelizada.', price: 165, category: 'burgers', image: 'https://picsum.photos/seed/burger5/400/300', ingredients: ['Carne', 'Queso Azul', 'Cebolla Caramelizada', 'Rúcula'] },
  { id: 'b6', name: 'Panda Veggie', description: 'Medallón de garbanzo y quinoa con aguacate.', price: 135, category: 'burgers', image: 'https://picsum.photos/seed/burger6/400/300', ingredients: ['Garbanzo/Quinoa', 'Aguacate', 'Brotes', 'Vegan Mayo'] },
  { id: 'b7', name: 'Grizzly Spicy', description: 'Habanero caramelizado y jalapeños frescos.', price: 140, category: 'burgers', image: 'https://picsum.photos/seed/burger7/400/300', ingredients: ['Carne', 'Habanero', 'Jalapeños', 'Queso Pepper Jack'] },
  { id: 'b8', name: 'Montañesa Supreme', description: 'Carne angus con huevo estrellado y jamón.', price: 175, category: 'burgers', image: 'https://picsum.photos/seed/burger8/400/300', ingredients: ['Carne Angus', 'Huevo', 'Jamón', 'Queso Gouda'] },
  { id: 'b9', name: 'Oso Tropical', description: 'Piña asada, jamón y salsa teriyaki.', price: 145, category: 'burgers', image: 'https://picsum.photos/seed/burger9/400/300', ingredients: ['Carne', 'Piña Asada', 'Jamón', 'Salsa Teriyaki'] },
  { id: 'b10', name: 'La Gran Cueva', description: 'Nuestra hamburguesa más grande: 450g de carne.', price: 280, category: 'burgers', image: 'https://picsum.photos/seed/burger10/400/300', ingredients: ['Triple Carne', 'Triple Queso', 'Tocino Infinito', 'Pepinillos'] },
];

export const DRINKS: Product[] = [
  { id: 'd1', name: 'Coca-Cola Original', description: '600ml Refrescante', price: 35, category: 'drinks', image: 'https://picsum.photos/seed/coke/400/300' },
  { id: 'd2', name: 'Coca-Cola Sin Azúcar', description: '600ml Sabor ligero', price: 35, category: 'drinks', image: 'https://picsum.photos/seed/cokezero/400/300' },
  { id: 'd3', name: 'Sprite', description: '600ml Lima-limón', price: 32, category: 'drinks', image: 'https://picsum.photos/seed/sprite/400/300' },
  { id: 'd4', name: 'Sidral Mundet', description: '600ml Manzana tradicional', price: 32, category: 'drinks', image: 'https://picsum.photos/seed/apple/400/300' },
  { id: 'd5', name: 'Fanta Naranja', description: '600ml Explosión frutal', price: 32, category: 'drinks', image: 'https://picsum.photos/seed/fanta/400/300' },
];

export const DESSERTS: Product[] = [
  { id: 'p1', name: 'Pay de Manzana del Bosque', description: 'Receta de la abuela osa.', price: 65, category: 'desserts', image: 'https://picsum.photos/seed/applepie/400/300' },
  { id: 'p2', name: 'Brownie Garra de Oso', description: 'Chocolate amargo con nueces.', price: 55, category: 'desserts', image: 'https://picsum.photos/seed/brownie/400/300' },
  { id: 'p3', name: 'Cheesecake de Frutos Rojos', description: 'Cremoso y delicioso.', price: 75, category: 'desserts', image: 'https://picsum.photos/seed/cheesecake/400/300' },
  { id: 'p4', name: 'Malteada de Vainilla Real', description: 'Hecha con helado artesanal.', price: 85, category: 'desserts', image: 'https://picsum.photos/seed/shake/400/300' },
  { id: 'p5', name: 'Cookie Monster', description: 'Galleta gigante recién horneada.', price: 45, category: 'desserts', image: 'https://picsum.photos/seed/cookie/400/300' },
];
