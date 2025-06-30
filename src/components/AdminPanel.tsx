
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Settings, Phone, Link, Music, FileText, Plus, Edit2, Trash2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";

interface AdminPanelProps {
  onBack: () => void;
}

interface EmergencyContact {
  id: number;
  name: string;
  phone: string;
  description: string;
}

interface ContentItem {
  id: number;
  title: string;
  url: string;
  type: 'article' | 'audio';
  description: string;
}

export const AdminPanel = ({ onBack }: AdminPanelProps) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'contacts' | 'content'>('contacts');
  
  // Sample data - в реальном проекте это будет из базы данных
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([
    { id: 1, name: "Горячая линия доверия", phone: "8-800-2000-122", description: "Круглосуточно" },
    { id: 2, name: "Кризисный центр", phone: "84956354538", description: "Психологическая помощь" }
  ]);

  const [contentItems, setContentItems] = useState<ContentItem[]>([
    { id: 1, title: "Понимание горя", url: "https://telegra.ph/article-1", type: 'article', description: "Статья о переживании расставаний" },
    { id: 2, title: "Медитация", url: "https://example.com/audio1.mp3", type: 'audio', description: "Управляемая медитация" }
  ]);

  const [showAddContact, setShowAddContact] = useState(false);
  const [showAddContent, setShowAddContent] = useState(false);
  const [newContact, setNewContact] = useState({ name: "", phone: "", description: "" });
  const [newContent, setNewContent] = useState({ title: "", url: "", type: 'article' as 'article' | 'audio', description: "" });

  const handleAddContact = () => {
    if (!newContact.name || !newContact.phone) {
      toast("Заполните все обязательные поля");
      return;
    }
    
    const contact: EmergencyContact = {
      id: Date.now(),
      ...newContact
    };
    
    setEmergencyContacts([...emergencyContacts, contact]);
    setNewContact({ name: "", phone: "", description: "" });
    setShowAddContact(false);
    toast("Контакт добавлен");
  };

  const handleAddContent = () => {
    if (!newContent.title || !newContent.url) {
      toast("Заполните все обязательные поля");
      return;
    }
    
    const content: ContentItem = {
      id: Date.now(),
      ...newContent
    };
    
    setContentItems([...contentItems, content]);
    setNewContent({ title: "", url: "", type: 'article', description: "" });
    setShowAddContent(false);
    toast("Контент добавлен");
  };

  const handleDeleteContact = (id: number) => {
    setEmergencyContacts(emergencyContacts.filter(c => c.id !== id));
    toast("Контакт удален");
  };

  const handleDeleteContent = (id: number) => {
    setContentItems(contentItems.filter(c => c.id !== id));
    toast("Контент удален");
  };

  return (
    <div className="min-h-screen pb-20 bg-gradient-to-br from-slate-900 to-blue-900">
      {/* Fixed back button */}
      <div className="fixed top-14 left-0 right-0 z-30 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-4 h-16">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="text-white border border-white/20 hover:bg-white/10 transition-colors duration-200"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Назад в меню
        </Button>
      </div>

      <div className="pt-16 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center justify-center">
              <Settings className="mr-2 h-6 w-6" />
              Панель администратора
            </h2>
            <p className="text-slate-300">Управление контентом и настройками</p>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 mb-6 bg-slate-800 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('contacts')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'contacts'
                  ? 'bg-blue-500 text-white'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Phone className="inline mr-2 h-4 w-4" />
              Экстренные контакты
            </button>
            <button
              onClick={() => setActiveTab('content')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'content'
                  ? 'bg-blue-500 text-white'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <FileText className="inline mr-2 h-4 w-4" />
              Контент
            </button>
          </div>

          {/* Emergency Contacts Tab */}
          {activeTab === 'contacts' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-white">Экстренные контакты</h3>
                <Button
                  onClick={() => setShowAddContact(true)}
                  className="bg-green-500 hover:bg-green-600"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Добавить контакт
                </Button>
              </div>

              {/* Add Contact Form */}
              {showAddContact && (
                <Card className="p-4 bg-slate-800 border-slate-700 mb-4">
                  <h4 className="text-white font-semibold mb-4">Новый контакт</h4>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Название организации *"
                      value={newContact.name}
                      onChange={(e) => setNewContact({...newContact, name: e.target.value})}
                      className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white"
                    />
                    <input
                      type="tel"
                      placeholder="Номер телефона *"
                      value={newContact.phone}
                      onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
                      className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white"
                    />
                    <input
                      type="text"
                      placeholder="Описание"
                      value={newContact.description}
                      onChange={(e) => setNewContact({...newContact, description: e.target.value})}
                      className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white"
                    />
                    <div className="flex gap-2">
                      <Button onClick={handleAddContact} className="bg-green-500 hover:bg-green-600">
                        Добавить
                      </Button>
                      <Button 
                        onClick={() => setShowAddContact(false)}
                        variant="outline"
                        className="border-slate-600 text-white hover:bg-slate-700"
                      >
                        Отмена
                      </Button>
                    </div>
                  </div>
                </Card>
              )}

              {/* Contacts List */}
              <div className="space-y-3">
                {emergencyContacts.map((contact) => (
                  <Card key={contact.id} className="p-4 bg-slate-800 border-slate-700">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="text-white font-semibold">{contact.name}</h4>
                        <p className="text-blue-400 font-mono">{contact.phone}</p>
                        <p className="text-slate-300 text-sm">{contact.description}</p>
                      </div>
                      <Button
                        onClick={() => handleDeleteContact(contact.id)}
                        variant="ghost"
                        size="sm"
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Content Tab */}
          {activeTab === 'content' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-white">Контент для чтения и прослушивания</h3>
                <Button
                  onClick={() => setShowAddContent(true)}
                  className="bg-green-500 hover:bg-green-600"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Добавить контент
                </Button>
              </div>

              {/* Add Content Form */}
              {showAddContent && (
                <Card className="p-4 bg-slate-800 border-slate-700 mb-4">
                  <h4 className="text-white font-semibold mb-4">Новый контент</h4>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Название *"
                      value={newContent.title}
                      onChange={(e) => setNewContent({...newContent, title: e.target.value})}
                      className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white"
                    />
                    <input
                      type="url"
                      placeholder="Ссылка (Telegraph, аудиофайл) *"
                      value={newContent.url}
                      onChange={(e) => setNewContent({...newContent, url: e.target.value})}
                      className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white"
                    />
                    <select
                      value={newContent.type}
                      onChange={(e) => setNewContent({...newContent, type: e.target.value as 'article' | 'audio'})}
                      className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white"
                    >
                      <option value="article">Статья</option>
                      <option value="audio">Аудио</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Описание"
                      value={newContent.description}
                      onChange={(e) => setNewContent({...newContent, description: e.target.value})}
                      className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white"
                    />
                    <div className="flex gap-2">
                      <Button onClick={handleAddContent} className="bg-green-500 hover:bg-green-600">
                        Добавить
                      </Button>
                      <Button 
                        onClick={() => setShowAddContent(false)}
                        variant="outline"
                        className="border-slate-600 text-white hover:bg-slate-700"
                      >
                        Отмена
                      </Button>
                    </div>
                  </div>
                </Card>
              )}

              {/* Content List */}
              <div className="space-y-3">
                {contentItems.map((item) => (
                  <Card key={item.id} className="p-4 bg-slate-800 border-slate-700">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {item.type === 'audio' ? (
                            <Music className="h-4 w-4 text-purple-400" />
                          ) : (
                            <FileText className="h-4 w-4 text-blue-400" />
                          )}
                          <h4 className="text-white font-semibold">{item.title}</h4>
                        </div>
                        <p className="text-slate-400 text-sm font-mono break-all">{item.url}</p>
                        <p className="text-slate-300 text-sm">{item.description}</p>
                      </div>
                      <Button
                        onClick={() => handleDeleteContent(item.id)}
                        variant="ghost"
                        size="sm"
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
