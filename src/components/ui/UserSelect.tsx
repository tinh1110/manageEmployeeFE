import { Select, Form } from 'antd'
import { User } from '../../types/user'
import { getUser } from '../../libs/helpers/getLocalStorage'
interface Props {
  users?: Array<User>
  onChangeHandler?: any
  onClearHandler?: any
  maxTagCount?: number
  excludeMe?: boolean
  name?: string
  rules?: any
  label?: string
  disabled?: boolean
  key?: string
  className?: string
  initialValue?: any
  placeHolder?: string
  maxTagTextLength?: number
}
const { Option } = Select
export const UserSelect = ({
  users,
  onChangeHandler,
  onClearHandler,
  maxTagCount,
  excludeMe,
  name,
  rules,
  label,
  disabled,
  key,
  className,
  initialValue,
  placeHolder,
  maxTagTextLength,
}: Props) => {
  const user_info = getUser()
  const filterUserHandler = (input: string, option: any) => {
    return (
      option.props.children
        .toString()
        .toLowerCase()
        .indexOf(input.toLowerCase()) !== -1
    )
  }
  return (
    <Form.Item
      label={label}
      name={name}
      className={className}
      rules={rules}
      key={key}
      initialValue={initialValue}
    >
      <Select
        className="w-full"
        mode="multiple"
        allowClear
        placeholder={placeHolder ? placeHolder : 'Select User'}
        filterOption={filterUserHandler}
        maxTagCount={maxTagCount}
        onChange={onChangeHandler}
        onClear={onClearHandler}
        disabled={disabled}
        maxTagTextLength={maxTagTextLength}
      >
        {!excludeMe &&
          users?.map((user: User) => (
            <Option key={user.id} value={user.id}>
              {user.name}
            </Option>
          ))}
        {excludeMe && (
          <>
            <Option key={user_info.id} value={user_info.id}>
              {`<<me>>`}
            </Option>
            {users?.map(
              (user: User) =>
                user.id !== user_info.id && (
                  <Option key={user.id} value={user.id}>
                    {user.name}
                  </Option>
                ),
            )}
          </>
        )}
      </Select>
    </Form.Item>
  )
}
