import { useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined';
import Modal from '../shared/Modal';
import { useTaskActions } from '../../hooks/task/useTaskActions';
import { Dropdown, DropdownItem } from '../shared/DropDown';
import TaskEditTab from './EditTaskTab';

interface TaskActionDropdownProps {
    taskId: string;
}

export const TaskActionDropdown = ({ taskId }: TaskActionDropdownProps) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
    const { deleteMutation } = useTaskActions();

    const dropdownActions = [
        {
            id: 'edit',
            label: 'Edit Task',
            icon: <EditOutlinedIcon sx={{ fontSize: 16 }} />,
            variant: 'default' as const,
            onClick: () => setIsEditModalOpen(true),
        },
        {
            id: 'delete',
            label: isConfirmingDelete ? 'Are you sure?' : 'Delete',
            icon: <DeleteOutlineIcon sx={{ fontSize: 16 }} />,
            variant: 'danger' as const,
            onClick: () => {
                if (!isConfirmingDelete) {
                    setIsConfirmingDelete(true);
                } else {
                    deleteMutation(taskId);
                }
            },
        },
    ];

    return (
        <>
            <Dropdown
                trigger={
                    <button className="p-1.5 rounded-lg text-foreground-muted hover:text-foreground hover:bg-border/50 transition-colors">
                        <MoreVertIcon fontSize="small" />
                    </button>
                }
                align="end"
            >
                {dropdownActions.map((action) => (
                    <DropdownItem
                        key={action.id}
                        onClick={() => {
                            action.onClick();
                        }}
                        variant={action.variant}
                        icon={action.icon}
                    >
                        {action.label}
                    </DropdownItem>
                ))}
            </Dropdown>

            <Modal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                title="Edit Task"
                maxWidth="max-w-xl"
            >
                <TaskEditTab
                    taskId={taskId}
                    onClose={() => setIsEditModalOpen(false)}
                />
            </Modal>
        </>
    );
};

export default TaskActionDropdown;