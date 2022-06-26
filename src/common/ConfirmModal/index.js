import { ExclamationCircleOutlined } from '@ant-design/icons'
import { Button, Modal, Space } from 'antd'
import { useState } from 'react'

export const ConfirmModal = () => {
  const [visible, setVisible] = useState(false)

  const showModal = () => {
    setVisible(true)
  }

  const hideModal = () => {
    setVisible(false)
  }

  return (
    <>
      <Button type="primary" onClick={confirm}>
        confirmar
      </Button>
      <Modal
        title="Modal"
        visible={visible}
        onOk={hideModal}
        onCancel={hideModal}
        okText="ok"
        cancelText="cancelar"
      ></Modal>
    </>
  )
}

const confirm = () => {
  Modal.confirm({
    title: 'Confirm',
    icon: <ExclamationCircleOutlined />,
    content: 'Bla bla ...',
    okText: 'confirmar',
    cancelText: 'cancelar',
  })
}

const App = () => (
  <Space>
    <ConfirmModal />
    <Button onClick={confirm}>Confirm</Button>
  </Space>
)

export default App
