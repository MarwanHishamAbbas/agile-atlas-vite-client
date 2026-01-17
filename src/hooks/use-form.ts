import { createFormHook } from '@tanstack/react-form'

import {
  Checkbox,
  Select,
  SubscribeButton,
  TextArea,
  TextField,
} from '../components/form-components'
import { fieldContext, formContext } from './use-form-context'

export const { useAppForm } = createFormHook({
  fieldComponents: {
    TextField,
    Select,
    TextArea,
    Checkbox,
  },
  formComponents: {
    SubscribeButton,
  },
  fieldContext,
  formContext,
})
