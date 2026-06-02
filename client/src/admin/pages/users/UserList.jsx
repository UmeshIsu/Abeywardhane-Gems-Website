import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/admin/context/AuthContext';
import DataTable from '@/admin/components/ui/DataTable';
import { getRoleLabel, getRoleBadgeClass } from '@/admin/lib/permissions';
import Modal from '@/admin/components/ui/Modal';
import FormField, { TextInput, SelectInput } from '@/admin/components/ui/FormField';
import { Plus, Pencil, Shield } from 'lucide-react';
import toast from 'react-hot-toast';

export default function UserList() {
  const { logActivity } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editUser, setEditUser] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => { load(); }, []);
  async function load() {
    setLoading(true);
    const { data } = await supabase.from('admin_profiles').select('*').order('created_at');
    setUsers(data || []);
    setLoading(false);
  }

  async function handleSaveRole() {
    if (!editUser) return;
    setSaving(true);
    const { error } = await supabase.from('admin_profiles').update({ role: editUser.role, full_name: editUser.full_name }).eq('id', editUser.id);
    if (error) toast.error(error.message);
    else {
      toast.success('User updated');
      await logActivity('update', 'user', editUser.id, editUser.full_name);
      load();
    }
    setEditUser(null);
    setSaving(false);
  }

  const columns = [
    { key: 'full_name', label: 'Name', render: (val, row) => (
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sapphire to-electric flex items-center justify-center text-white text-xs font-bold">{val?.charAt(0)?.toUpperCase() || '?'}</div>
        <div>
          <div className="font-medium text-ink dark:text-white">{val || 'Unnamed Admin'}</div>
          <div className="text-xs text-muted">{row.email || row.id?.slice(0, 8)}</div>
        </div>
      </div>
    )},
    { key: 'role', label: 'Role', render: (val) => <span className={`inline-block px-2.5 py-1 rounded-full text-[0.68rem] font-semibold ${getRoleBadgeClass(val)}`}>{getRoleLabel(val)}</span> },
    { key: 'actions', label: '', sortable: false, render: (_, row) => (
      <button onClick={(e) => { e.stopPropagation(); setEditUser({ ...row }); }} className="w-8 h-8 rounded-lg hover:bg-cream dark:hover:bg-ink-line flex items-center justify-center text-muted hover:text-sapphire"><Pencil className="w-4 h-4" /></button>
    )},
  ];

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-ink dark:text-white">Users</h1><p className="text-sm text-muted mt-1">Manage admin users and roles</p></div>
      <DataTable columns={columns} data={users} loading={loading} emptyMessage="No admin users found." />

      <Modal open={!!editUser} onClose={() => setEditUser(null)} title="Edit User" size="sm"
        footer={<>
          <button onClick={() => setEditUser(null)} className="px-4 py-2 rounded-lg text-sm text-muted hover:bg-cream dark:hover:bg-ink-line">Cancel</button>
          <button onClick={handleSaveRole} disabled={saving} className="px-4 py-2 rounded-lg text-sm font-semibold bg-sapphire text-white hover:bg-sapphire-deep disabled:opacity-60">Save</button>
        </>}>
        {editUser && (
          <div className="space-y-4">
            <FormField label="Full Name" id="edit-name">
              <TextInput id="edit-name" value={editUser.full_name || ''} onChange={(e) => setEditUser((p) => ({ ...p, full_name: e.target.value }))} />
            </FormField>
            <FormField label="Role" id="edit-role">
              <SelectInput id="edit-role" value={editUser.role} onChange={(e) => setEditUser((p) => ({ ...p, role: e.target.value }))}>
                <option value="editor">Editor</option>
                <option value="admin">Admin</option>
                <option value="super_admin">Super Admin</option>
              </SelectInput>
            </FormField>
          </div>
        )}
      </Modal>
    </div>
  );
}
