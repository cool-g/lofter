import React, { memo } from 'react'
import { connect } from 'react-redux'
import { Dispatch,AnyAction } from 'redux'
import { rootState } from '@/store'
import { changeModel } from '@/store/actionCreators/model'

interface MineProps {
  model:boolean
  changeModelDispatch: (data:boolean) => void
}

const Mine:React.FC<MineProps> = (props) => {
  const {
    model
  } = props
  const { 
    changeModelDispatch 
  } = props



  return (
    <div>
      <button onClick={()=>changeModelDispatch(!model)}>换主题</button>
    </div>
  )
}

const mapStateToProps = (state:rootState) => ({
  model:state.model
})
const mapDispatchToProps = (dispatch:Dispatch) => ({
  changeModelDispatch(data:boolean){
    dispatch<AnyAction>(changeModel(data))
  }
})
export default connect(mapStateToProps,mapDispatchToProps)(memo(Mine))
