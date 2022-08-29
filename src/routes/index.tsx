import React,{ lazy } from 'react'
import { Routes,Route,Navigate } from 'react-router-dom'
import Home from '@/pages/Home'
const Follow = lazy(()=>import('@/pages/Follow'))
const Shop = lazy(()=>import('@/pages/Shop'))
const Mine = lazy(()=>import('@/pages/Mine'))
const Find = lazy(()=>import('@/pages/Home/Find'))
const Granary = lazy(()=>import('@/pages/Home/Granary'))
const Search = lazy(()=>import('@/pages/Search'))
const Navigation = lazy(()=>import('@/pages/Navigation'))

export default () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace={true}/>}></Route>
        <Route path="/home" element={<Home/>}>
          <Route path="find" element={<Find/>}/>
          <Route path="granary" element={<Granary/>}/>
        </Route>
        <Route path="/follow" element={<Follow/>}></Route>
        <Route path="/shop" element={<Shop/>}></Route>
        <Route path="/mine" element={<Mine/>}></Route>
        <Route path="/search" element={<Search/>}></Route>
        <Route path="/navigation" element={<Navigation/>}></Route>
        {/* 非定义的路由则跳转到主页 */}
        <Route path="*" element={<Navigate to="/home" replace={true}/>}></Route>
      </Routes>
    </>
  )
}
