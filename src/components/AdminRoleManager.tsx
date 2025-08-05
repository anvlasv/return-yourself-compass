import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Users, UserCheck, UserX } from 'lucide-react';

interface AdminRoleManagerProps {
  onBack: () => void;
}

export const AdminRoleManager = ({ onBack }: AdminRoleManagerProps) => {
  const [telegramId, setTelegramId] = useState('');
  const [selectedRole, setSelectedRole] = useState<'admin' | 'user'>('user');
  const [isLoading, setIsLoading] = useState(false);

  const handleAssignRole = async () => {
    if (!telegramId) {
      toast.error('Введите Telegram ID пользователя');
      return;
    }

    const telegramIdNumber = parseInt(telegramId);
    if (isNaN(telegramIdNumber)) {
      toast.error('Telegram ID должен быть числом');
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase.rpc('assign_user_role', {
        _telegram_id: telegramIdNumber,
        _role: selectedRole
      });

      if (error) {
        console.error('Ошибка назначения роли:', error);
        toast.error('Ошибка назначения роли: ' + error.message);
      } else {
        toast.success(`Роль ${selectedRole === 'admin' ? 'администратор' : 'пользователь'} успешно назначена`);
        setTelegramId('');
      }
    } catch (error) {
      console.error('Ошибка назначения роли:', error);
      toast.error('Ошибка назначения роли');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-4 pt-6">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            onClick={onBack}
            className="text-white hover:bg-white/10"
            size="sm"
          >
            ← Назад
          </Button>
          <h1 className="text-2xl font-bold text-white">Управление ролями</h1>
        </div>

        {/* Assign Role Card */}
        <Card className="mb-6 bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <UserCheck className="h-5 w-5" />
              Назначить роль пользователю
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="telegram-id" className="text-white">
                Telegram ID пользователя
              </Label>
              <Input
                id="telegram-id"
                type="number"
                placeholder="Введите Telegram ID"
                value={telegramId}
                onChange={(e) => setTelegramId(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role-select" className="text-white">
                Роль
              </Label>
              <Select value={selectedRole} onValueChange={(value: 'admin' | 'user') => setSelectedRole(value)}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">Пользователь</SelectItem>
                  <SelectItem value="admin">Администратор</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={handleAssignRole}
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isLoading ? 'Назначение...' : 'Назначить роль'}
            </Button>
          </CardContent>
        </Card>

        {/* Instructions Card */}
        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Users className="h-5 w-5" />
              Инструкции
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-white/80 text-sm">
            <div className="flex items-start gap-2">
              <UserCheck className="h-4 w-4 mt-0.5 text-green-400" />
              <div>
                <p className="font-medium">Как найти Telegram ID:</p>
                <p>Попросите пользователя написать боту @userinfobot - он покажет Telegram ID</p>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <UserX className="h-4 w-4 mt-0.5 text-orange-400" />
              <div>
                <p className="font-medium">Безопасность:</p>
                <p>Только администраторы могут назначать роли. Роль "admin" дает полный доступ к системе.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};