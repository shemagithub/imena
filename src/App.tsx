import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ShopProvider } from './context/ShopContext'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { Shop } from './pages/Shop'
import { CollectionsIndex, CollectionDetail } from './pages/Collections'
import { Product } from './pages/Product'
import { Heritage } from './pages/Heritage'
import { Contact } from './pages/Contact'

export default function App() {
  return (
    <ShopProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="shop" element={<Shop />} />
            <Route path="collections" element={<CollectionsIndex />} />
            <Route path="collections/:id" element={<CollectionDetail />} />
            <Route path="product/:id" element={<Product />} />
            <Route path="heritage" element={<Heritage />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ShopProvider>
  )
}
