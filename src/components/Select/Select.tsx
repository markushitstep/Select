import React, {
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
  ReactNode,
  ReactElement,
} from "react";
import { ReactComponent as ArrowDownIcon } from "../../icons/ArrowDown.svg";
import { ReactComponent as ArrowUpIcon } from "../../icons/ArrowUp.svg";

interface SelectProps<T> {
  setValue: (value: T) => void;
  children: ReactNode;
}

interface OptionProps<T> {
  value: T;
  selected?: boolean;
  children: ReactNode;
}

export const Select = <T,>({ setValue, children }: SelectProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const options = useMemo(() => {
    return React.Children.toArray(children)
      .filter((child): child is ReactElement<OptionProps<T>> => React.isValidElement(child))
      .map((child) => ({
        value: child.props.value,
        label: child.props.children,
        selected: child.props.selected,
      }));
  }, [children]);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleSelect = useCallback(
    (val: T) => {
      setValue?.(val);
      setIsOpen(false);
    },
    [setValue],
  );

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (!containerRef.current) return;

      if (!containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className={"select" + (isOpen === true ? " selectActive" : "")}>
      <div onClick={toggleOpen} className="selectButton">
        <div className="selectLabel">
          {options.find((option) => option.selected === true)?.label}
        </div>
        {isOpen ? (
          <ArrowUpIcon width={7} height={4} fill="none" />
        ) : (
          <ArrowDownIcon width={7} height={4} fill="none" />
        )}
      </div>

      {isOpen && (
        <div className="selectDropdown">
          <div className="selectList">
            {options.map((option, index) => (
              <div
                key={index}
                data-selected={option.selected}
                onClick={() => handleSelect(option.value)}
                className={"selectOption" + (option.selected === true ? " selectOptionActive" : "")}
              >
                {option.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const Option = <T,>(_props: OptionProps<T>) => {
  console.log(_props);
  return null;
};
