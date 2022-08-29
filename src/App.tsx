import { Suspense } from 'react'
import { GlobalStyle } from './style'
import Routes from '@/routes'
import { connect } from 'react-redux'
import { rootState } from '@/store'
import Footer from './components/Footer'
import './App.css'

interface AppProps {
  model:boolean
}

const App:React.FC<AppProps> = (props) => {
  const { model } = props

  return (
    <div className="App">
      <GlobalStyle model={model}/>
      <Suspense fallback={<div>loading...</div>}>
        <Routes/>
      </Suspense>
      <Footer model={model}/>
    </div>
  )
}

const mapStatetoProps = (state:rootState) => ({
  model:state.model
})

export default connect(mapStatetoProps)(App)
