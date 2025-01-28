import { useState, useEffect, useRef } from 'react';
import LayoutContainer from '../components/LayoutContainer';
import Navbar from '../components/Navbar';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import supabase from '@/supabaseClient';
import moment from 'moment';
import { Send } from 'lucide-react';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [currentUser, setCurrentUser] = useState('');
  const bottomRef = useRef(null); // Referensi ke elemen terakhir pesan

  // Fetch messages from Supabase
  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) console.error('Error fetching messages:', error);
    else setMessages(data);
  };

  // Insert new message to Supabase
  const insertMessage = async () => {
    if (!text) return;

    const { error } = await supabase
      .from('messages')
      .insert([{ username: currentUser, text }]);

    if (error) console.error('Error inserting message:', error);
    else setText('');
  };

  useEffect(() => {
    // Generate or retrieve current username
    let username = localStorage.getItem('chat-username');
    if (!username) {
      username = `@user${Date.now().toString().slice(-4)}`;
      localStorage.setItem('chat-username', username);
    }
    setCurrentUser(username);

    // Fetch initial messages
    fetchMessages();

    // Subscribe to real-time updates
    const channel = supabase
      .channel('realtime-messages')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages' },
        (payload) => {
          setMessages((prevMessages) => [...prevMessages, payload.new]);
        }
      )
      .subscribe();

    // Cleanup subscription on component unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    // Scroll to the bottom whenever messages are updated
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Mencegah default behavior Enter (misalnya, menambah newline)
      insertMessage(); // Kirim pesan
    }
  };


  return (
    <>
      <LayoutContainer>
        <Navbar />
        <div className="w-[95%] mt-7 h-3/4 mx-auto rounded-lg bg-gray-200 dark:bg-zinc-800">
          <ScrollArea className="h-full w-full overflow-y-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`w-[90%] mx-auto my-2 flex ${
                  message.username === currentUser ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`flex flex-col gap-2 max-w-48 ${
                    message.username === currentUser ? 'items-end' : 'items-start'
                  }`}
                >
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {message.username}
                    </span>
                    <span className="text-xs font-normal text-gray-500 dark:text-gray-400">
                      {moment(message.created_at).startOf('minute').fromNow()}
                    </span>
                  </div>
                  <div
                    className={`flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-lg ${
                      message.username === currentUser
                        ? ' text-gray-900 bg-yellow-500 dark:bg-zinc-100'
                        : 'bg-gray-100  dark:text-white dark:bg-yellow-700'
                    }`}
                  >
                    <p className="text-sm font-normal">{message.text}</p>
                  </div>
                </div>
              </div>
            ))}
            {/* Elemen referensi untuk scroll */}
            <div ref={bottomRef} />
          </ScrollArea>
        </div>
        <div className="flex w-[95%] mx-auto items-center my-3 space-x-2">
          <Input
            type="text"
            placeholder="Message"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyPress={handleKeyPress}
            className="bg-gray-200 border-zinc-900 text-zinc-900 dark:bg-zinc-800 dark:border-gray-100 dark:text-gray-100 focus:border-none"
          />
          <button
            onClick={insertMessage}
            size="icon"
            className="bg-gray-200 text-zinc-800 scale-90 border-1 border-zinc-900"
          >
            <Send className=" size-5.5"/>
          </button>
        </div>
      </LayoutContainer>
    </>
  );
}

export default Chat;
