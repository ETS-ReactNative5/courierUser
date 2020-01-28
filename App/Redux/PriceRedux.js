import {createReducer, createActions} from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  priceRequest: ['distance', 'duration', 'price'],
  priceSuccess: ['payload'],
  priceFailure: null
})

export const PriceTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  distance: null,
  duration: null,
  price: null,
  fetching: null,
  payload: null,
  error: null
})

/* ------------- Selectors ------------- */

export const PriceSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, {distance, duration, price}) =>
  state.merge({fetching: true, distance, duration, price, payload: null})

// successful api lookup
export const success = (state, action) => {
  const {payload} = action
  return state.merge({fetching: false, error: null, payload})
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({fetching: false, error: true, payload: null})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PRICE_REQUEST]: request,
  [Types.PRICE_SUCCESS]: success,
  [Types.PRICE_FAILURE]: failure
})
