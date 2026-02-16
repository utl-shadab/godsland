
import { Outlet } from 'react-router-dom'

const UserLayout = () => {
  return (
    <div>
        {/* header */}
        {/* sidebar */}
        <Outlet
        />
        {/* footer */}
      
    </div>
  )
}

export default UserLayout
