export interface Product {
  B: boolean
  C: number
  CV: null
  G: number
  P: number
  Pl: null
  T: number
}

export interface PreparedProduct {
  id: number
  groupId: number
  price: number
  inStock: number
}

export interface CartProduct extends PreparedProduct {
  quantity: number
}

export interface RootState {
  names: null | any
  goods: null | PreparedProduct[]
  rate: null | number
}

export interface CartState {
  goods: CartProduct[]
}

export interface RateClassObject {
  'rate-up': boolean
  'rate-down': boolean
}

export interface AppData {
  rateHasGrown: null | boolean
  rateAnimation: boolean
}
