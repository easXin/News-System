import {applyMiddleware,compose,createStore,combineReducers} from 'redux'
import CollApsedReducer from './reducers/CollapsedReducer'
import LoadingReducer  from './reducers/LoadingReducer'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import persistStore from 'redux-persist/es/persistStore'
import reduxThunk from 'redux-thunk'
import reduxPromise from 'redux-promise'


const persistConfig = {
    key: 'eric',
    storage: storage, // localstorage
    blacklist: [LoadingReducer]
}
const composeEnhancers =
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;


//const store = createStore(reducer, composeEnhancers(applyMiddleware(reduxThunk,reduxPromise)))

  
//   const authPersistConfig = {
//     key: 'auth',
//     storage: storage,
//     blacklist: ['somethingTemporary']
//   }
  
//   const rootReducer = combineReducers({
//     auth: persistReducer(authPersistConfig, authReducer),
//     other: otherReducer,
//   })
const reducer = combineReducers({
    CollApsedReducer,LoadingReducer
})
const persistedReducer = persistReducer(persistConfig, reducer)


const store = createStore(persistedReducer,composeEnhancers(applyMiddleware(reduxThunk,reduxPromise)))
const persiststore = persistStore(store)

export {persiststore, store};

/*
    store.dispatch()
    store.subscribe()
*/