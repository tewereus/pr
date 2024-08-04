import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { getAllColors } from '../../features/color/colorSlice'

const Colors = () => {
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getAllColors())
  }, [])

  const {colors} = useSelector((state) => state.colors)
  return (
    <div>{colors}</div>
  )
}

export default Colors