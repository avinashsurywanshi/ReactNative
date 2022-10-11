import React, { createRef, useEffect } from 'react'
import ActionSheet from 'react-native-actions-sheet'

interface IAppActionSheetProps {
  open: boolean
  children: React.ReactNode
  onClose: () => void
}

const AppActionSheet = ({ open, children, onClose }: IAppActionSheetProps) => {
  const actionSheetRef = createRef<ActionSheet>()

  useEffect(() => {
    actionSheetRef.current?.setModalVisible(open)
  }, [open])

  return (
    <ActionSheet ref={actionSheetRef} onClose={onClose}>
      {children}
    </ActionSheet>
  )
}

export default AppActionSheet
