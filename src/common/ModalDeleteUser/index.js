import { ExclamationCircleOutlined } from '@ant-design/icons'
import { Modal, Space } from 'antd'
import { useState } from 'react'
import ICONDELETE from '../../assets/images/delete.svg'
import { Button } from '../Button'
import { useUsers } from '../../context/usersContext'

const { confirm } = Modal

export const ModalDeleteUser = ({ userId, userName }) => {
  const { deleteUser } = useUsers()

  const userDelete = async () => {
    Modal.destroyAll()
    await deleteUser(userId)
  }
  const showConfirm = () => {
    confirm({
      closable: true,
      icon: null,
      content: (
        <div>
          <p className="text-center font-semibold">
            {`¿Deseas eliminar al usuario ${userName}`}
          </p>
          <div className="flex flow-row gap-2">
            <Button text="Si" type="primary" onClick={userDelete} />
            <Button text="No" type="warning" onClick={Modal.destroyAll} />
          </div>
        </div>
      ),
      footer: null,
      okButtonProps: { style: { display: 'none' } },
      cancelButtonProps: { style: { display: 'none' } },
    })
  }
  return (
    <>
      <Button
        text={<img className="w-5/12 m-auto h-5" src={ICONDELETE} />}
        type="danger"
        onClick={showConfirm}
      />
    </>
  )
}

export default ModalDeleteUser
