import { useMemo, useRef, useEffect, type JSX } from 'react';
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Inject,
  Page,
  Sort,
  Filter,
  Edit,
  Toolbar,
} from '@syncfusion/ej2-react-grids';
import type {
  Column,
  ColumnModel,
  FilterSettingsModel,
  PageSettingsModel,
  EditSettingsModel,
  ToolbarItems,
} from '@syncfusion/ej2-grids';
import {
  RatingComponent,
  MaskedTextBoxComponent,
} from '@syncfusion/ej2-react-inputs';
import type { ChangeEventArgs } from '@syncfusion/ej2-inputs';
import { ChipListComponent } from '@syncfusion/ej2-react-buttons';
import type {
  EmployeeGridProps,
  Employee,
  ContactEditTemplateProps,
} from '../types/app-types';
import '../styles/EmployeeGrid.css';

const CONTACT_MASK = '(000) 000-0000';

export default function EmployeeGrid({
  data,
  currentRole,
  roleConfig,
  columns,
}: EmployeeGridProps): JSX.Element {
  const gridRef = useRef<GridComponent | null>(null);

  const filterSettings: FilterSettingsModel = { type: 'Menu' };
  const pageSettings: PageSettingsModel = { pageSize: 20 };

  const EmailTemplate = (props: Employee): JSX.Element => (
    <div className="cell-template email-template">
      <a href={`mailto:${props.email}`}>{props.email}</a>
    </div>
  );

  const RatingTemplate = (props: Employee): JSX.Element => {
    const value = Number(props?.rating) || 0;
    return (
      <div className="cell-template rating-template">
        <div style={{ transform: 'scale(0.5)', transformOrigin: 'left center' }}>
          <RatingComponent value={value} readOnly />
        </div>
      </div>
    );
  };

  const ActiveTemplate = (props: Employee): JSX.Element => {
    const chipText = props?.active ? 'Active' : 'Inactive';
    const chipClass = props?.active ? 'e-success' : 'e-danger';

    return (
      <div className="cell-template status-template">
        <div className="grid-chip-center">
          <ChipListComponent cssClass={`${chipClass} chip-rounded`} chips={[{ text: chipText }]} />
        </div>
      </div>
    );
  };

  const ContactEditTemplate = (props: ContactEditTemplateProps): JSX.Element => {
    const value = props?.rowData?.contact ?? props?.contact ?? '';

    const handleChange = (args: ChangeEventArgs): void => {
      const nextValue = typeof args.value === 'string' ? args.value : '';
      if (props?.rowData) {
        props.rowData.contact = nextValue;
      } else if (props) {
        props.contact = nextValue;
      }
    };

    return (
      <div className="cell-template contact-edit-template">
        <MaskedTextBoxComponent
          mask={CONTACT_MASK}
          value={value}
          placeholder="(555) 123-4567"
          width="100%"
          change={handleChange}
        />
      </div>
    );
  };

  const columnDefs = useMemo<ColumnModel[]>(() => {
    return columns.map((col) => {
      const updatedCol: ColumnModel = { ...col };
      const fieldName = updatedCol.field ?? '';

      if (fieldName === 'email') {
        updatedCol.template = EmailTemplate;
      } else if (fieldName === 'rating') {
        updatedCol.template = RatingTemplate;
        updatedCol.edit = {
          params: {
            min: 0,
            max: 5,
            decimals: 0,
            format: 'n0',
          },
        };
      } else if (fieldName === 'salary') {
        updatedCol.edit = {
          params: {
            showSpinButton: false,
            decimals: 0,
            format: 'n0',
          },
        };
      } else if (fieldName === 'active') {
        updatedCol.template = ActiveTemplate;
      } else if (fieldName === 'contact') {
        updatedCol.editTemplate = ContactEditTemplate;
      }

      if (currentRole === 'Manager' && fieldName && !['rating', 'contact'].includes(fieldName)) {
        updatedCol.allowEditing = false;
      }

      return updatedCol;
    });
  }, [columns, currentRole]);

  const toolbarItems = useMemo<ToolbarItems[]>(() => {
    const config = roleConfig[currentRole] ?? roleConfig.Employee;
    const items: ToolbarItems[] = [];
    if (config.canAdd) items.push('Add');
    if (config.canEdit) items.push('Edit');
    if (config.canDelete) items.push('Delete');
    if (config.canAdd || config.canEdit || config.canDelete) {
      items.push('Update', 'Cancel');
    }
    items.push('Search');
    return items;
  }, [currentRole, roleConfig]);

  const gridEditSettings = useMemo<EditSettingsModel>(() => {
    const config = roleConfig[currentRole] ?? roleConfig.Employee;
    return {
      allowEditing: config.canEdit,
      allowAdding: config.canAdd,
      allowDeleting: config.canDelete,
      mode: 'Normal',
    };
  }, [currentRole, roleConfig]);

  useEffect(() => {
    const gridInstance = gridRef.current;
    if (!gridInstance) return;

    const visibleFields = roleConfig[currentRole]?.visible ?? [];
    columnDefs.forEach((column) => {
      const fieldName = column.field;
      if (!fieldName) return;

      const columnModel = gridInstance.getColumnByField(fieldName) as Column | undefined;
      if (!columnModel) return;

      columnModel.visible = visibleFields.includes(fieldName);
    });

    gridInstance.refreshColumns();
  }, [currentRole, columnDefs, roleConfig]);

  return (
    <section className="card border-0 shadow-sm">
      <div className="card-body">
        <div className="grid-container">
          <GridComponent
            height="100%"
            ref={gridRef}
            dataSource={data}
            allowPaging
            allowSorting
            allowFiltering
            toolbar={toolbarItems}
            editSettings={gridEditSettings}
            filterSettings={filterSettings}
            pageSettings={pageSettings}
            clipMode="EllipsisWithTooltip"
          >
            <ColumnsDirective>
              {columnDefs.map((column, idx) => (
                <ColumnDirective key={column.field ?? column.headerText ?? idx} {...column} />
              ))}
            </ColumnsDirective>
            <Inject services={[Page, Sort, Filter, Edit, Toolbar]} />
          </GridComponent>
        </div>
      </div>
    </section>
  );
}