import useDialogState from '@/hooks/use-dialog-state';
import React, { useState } from 'react';

type TableDialogType = 'invite' | 'add' | 'edit' | 'delete';

interface TableContextType<T> {
  open: TableDialogType | null;
  setOpen: (str: TableDialogType | null) => void;
  currentRow: T | null;
  setCurrentRow: React.Dispatch<React.SetStateAction<T | null>>;
}

const TableHandleContext = React.createContext<TableContextType<any> | null>(
  null
);

export const createTableHandleContext = <T,>() => {
  return React.createContext<TableContextType<T> | null>(null);
};

interface Props {
  children: React.ReactNode;
}

export default function TableHandleProvider<T>({ children }: Props) {
  const [open, setOpen] = useDialogState<TableDialogType>(null);
  const [currentRow, setCurrentRow] = useState<T | null>(null);

  return (
    <TableHandleContext value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </TableHandleContext>
  );
}

export const useTableHandle = <T,>() => {
  const context = React.useContext(
    TableHandleContext as React.Context<TableContextType<T>>
  );
  if (!context) {
    throw new Error('useUsers has to be used within <TableHandleContext>');
  }
  return context;
};
