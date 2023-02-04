import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton'

const LoadingSkeleton = () => {
  return (
    <div>
      <Skeleton height={40} style={{ margin: '10px 0' }} />
      <Skeleton height={20} style={{ margin: '10px 0' }} />
      <Skeleton height={20} style={{ margin: '10px 0' }} />
      <Skeleton height={40} style={{ margin: '10px 0' }} />
      <Skeleton height={20} style={{ margin: '10px 0' }} />
      <Skeleton height={20} style={{ margin: '10px 0' }} />
      <Skeleton height={40} style={{ margin: '10px 0' }} />
      <Skeleton height={20} style={{ margin: '10px 0' }} />
      <Skeleton height={20} style={{ margin: '10px 0' }} />
    </div>
  )
}

export default LoadingSkeleton
