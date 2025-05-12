
import React from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Contact = () => {
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <div className="flex-1 ml-[240px] transition-all duration-300">
        <Navbar />
        
        <div className="container px-4 py-12 mt-16">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Entre em Contato</h1>
            
            <div className="glass p-8 rounded-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-xl font-semibold mb-4">Fale Conosco</h2>
                  <p className="text-muted-foreground mb-6">
                    Estamos aqui para ajudar com qualquer dúvida sobre nossos serviços ou para discutir como podemos auxiliar no crescimento do seu negócio.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="bg-primary/10 p-2 rounded-full text-primary">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20 10.999H22C22 5.869 18.127 2 12.99 2V4C17.052 4 20 6.943 20 10.999Z" fill="currentColor" />
                          <path d="M13 8C15.206 8 17 9.794 17 12H19C19 8.686 16.314 6 13 6V8Z" fill="currentColor" />
                          <path d="M13 4V2C7.872 2 4 5.869 4 10.999H6C6 6.943 8.948 4 13 4Z" fill="currentColor" />
                          <path d="M7 12H5C5 15.314 7.686 18 11 18V16C8.794 16 7 14.206 7 12Z" fill="currentColor" />
                          <path d="M12 15H16C17.104 15 18 14.104 18 13V12C18 10.896 17.104 10 16 10H14V9C14 8.448 13.552 8 13 8H11C10.448 8 10 8.448 10 9V14C10 14.552 10.448 15 11 15H12Z" fill="currentColor" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium">Telefone</h3>
                        <p className="text-sm text-muted-foreground">(11) 4002-8922</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="bg-primary/10 p-2 rounded-full text-primary">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="currentColor" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium">Email</h3>
                        <p className="text-sm text-muted-foreground">contato@entrepreedge.com.br</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="bg-primary/10 p-2 rounded-full text-primary">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="currentColor" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium">Endereço</h3>
                        <p className="text-sm text-muted-foreground">Av. Paulista, 1000 - São Paulo, SP</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold mb-4">Envie sua Mensagem</h2>
                  <form className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-1">Nome</label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-2 border border-input rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Seu nome completo"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-2 border border-input rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="seu@email.com"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-1">Mensagem</label>
                      <textarea
                        id="message"
                        rows={4}
                        className="w-full px-4 py-2 border border-input rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Como podemos ajudar?"
                      />
                    </div>
                    
                    <Button className="w-full">
                      <Send size={16} className="mr-2" />
                      Enviar Mensagem
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
