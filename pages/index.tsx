import { MultiSelect } from "carbon-components-react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

enum Days {
  Biweekly = 1 << 1,
  Monday = 1 << 2,
  Tuesday = 1 << 3,
  Wednesday = 1 << 4,
  Thursday = 1 << 5,
  Friday = 1 << 6,
  Saturday = 1 << 7,
  Sunday = 1 << 8,
  Weekday = Monday | Tuesday | Wednesday | Thursday | Friday,
  Weekend = Saturday | Sunday,
}

const WiseCheckbox = ({
  label,
  defaultChecked,
  onChange,
}: {
  label: string;
  defaultChecked: boolean;
  onChange: (checked: boolean) => void;
}) => {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <>
      <label>{label}</label>
      <input
        type="checkbox"
        id={label}
        name={label}
        checked={checked}
        onChange={(e) => {
          setChecked(e.target.checked);
          onChange(e.target.checked);
        }}
      />
    </>
  );
};

const Home: NextPage = () => {
  const [days, setDays] = useState(
    Days.Monday | Days.Tuesday | Days.Wednesday | Days.Thursday | Days.Friday
  );
  useEffect(() => {
    console.log(days);
  }, [days]);

  return (
    <>
      <MultiSelect
        id="test"
        items={Object.keys(Days).filter((k) => isNaN(Number(k))) as any}
        itemToString={(item) => item}
        onChange={(selectedItems) => console.log(selectedItems)}
      />
      <WiseCheckbox
        label="Monday"
        defaultChecked={(days & Days.Monday) !== 0}
        onChange={(checked) =>
          setDays(checked ? days | Days.Monday : days & ~Days.Monday)
        }
      />
      <WiseCheckbox
        label="Tuesday"
        defaultChecked={(days & Days.Tuesday) !== 0}
        onChange={(checked) =>
          setDays(checked ? days | Days.Tuesday : days & ~Days.Tuesday)
        }
      />
      <WiseCheckbox
        label="Wednesday"
        defaultChecked={(days & Days.Wednesday) !== 0}
        onChange={(checked) => {
          setDays(checked ? days | Days.Wednesday : days & ~Days.Wednesday);
        }}
      />
    </>
  );
};

export default Home;
