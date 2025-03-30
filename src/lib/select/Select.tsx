import {
  Portal, Select as CSelect, SelectRootProps
} from '@chakra-ui/react';

// @ts-ignore
interface Props extends SelectRootProps {
  label?: string;
  placeholder?: string;
  value: SelectRootProps['value'];
  onChange: SelectRootProps['onValueChange'];
}

const Select = ({
  label, value, onChange, placeholder, ...props
}: Props) => (
  <CSelect.Root
    value={value}
    onValueChange={onChange}
    {...props}
  >
    <CSelect.HiddenSelect />
    {label && <CSelect.Label>{label}</CSelect.Label>}
    <CSelect.Control>
      <CSelect.Trigger>
        <CSelect.ValueText placeholder={placeholder} />
      </CSelect.Trigger>
      <CSelect.IndicatorGroup>
        <CSelect.Indicator />
      </CSelect.IndicatorGroup>
    </CSelect.Control>
    <Portal>
      <CSelect.Positioner>
        <CSelect.Content>
          {props.collection.items.map((option) => (
            <CSelect.Item item={option} key={option.value}>
              {option.label}
              <CSelect.ItemIndicator />
            </CSelect.Item>
          ))}
        </CSelect.Content>
      </CSelect.Positioner>
    </Portal>
  </CSelect.Root>
);
export default Select;
