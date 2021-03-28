import cloneDeep from 'lodash-es'
import { addToCart as add, totalPrice } from './shoppingCart.js'

console.log('Importing module');

add('pizza', 5);