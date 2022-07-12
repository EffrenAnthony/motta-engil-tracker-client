import { ExclamationCircleOutlined } from '@ant-design/icons'
import { Modal, Space } from 'antd'
import { useState } from 'react'
import ICONDELETE from '../../assets/images/delete.svg'
import { Button } from '../Button'
import { useUsers } from '../../context/usersContext'

export const ModalDeleteUser = ({ userId, userName }) => {
  const [visible, setVisible] = useState(false)
  const { deleteUser } = useUsers()

  const showModal = () => {
    setVisible(true)
  }

  const hideModal = () => {
    setVisible(false)
  }

  const userDelete = async () => {
    await deleteUser(userId)
    hideModal()
  }

  return (
    <>
      {/* <Button type="primary" onClick={confirm}>
        confirmar
      </Button> */}
      <Button
        text={<img className="w-5/12 m-auto h-5" src={ICONDELETE} />}
        type="danger"
        onClick={showModal}
      />
      <Modal
        title="Confirm"
        // icon= <ExclamationCircleOutlined />
        visible={visible}
        onOk={userDelete}
        onCancel={hideModal}
        okText="confirmar"
        cancelText="cancelar"
        // content={'¿Deseas eliminar al usuario ' + userName + '?'}
      >
        <ExclamationCircleOutlined />
        <p>{'¿Deseas eliminar al usuario ' + userName + '?'}</p>
      </Modal>
    </>
  )
}

// const confirm = () => {
//   Modal.confirm({
//     title: 'Confirm',
//     icon: <ExclamationCircleOutlined />,
//     content: '¿Deseas eliminar al usuario?',
//     okText: 'confirmar',
//     cancelText: 'cancelar',
//   })
// }

const App = () => (
  <Space>
    <ModalDeleteUser />
    {/* <Button onClick={userDelete}>Confirm</Button> */}
  </Space>
)

export default App
