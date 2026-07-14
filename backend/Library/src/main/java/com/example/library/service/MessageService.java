package com.example.library.service;


import com.example.library.dto.request.MessageRequest;
import com.example.library.dto.response.AdminResponse;
import com.example.library.entity.Message;
import com.example.library.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class MessageService {

        private final MessageRepository messageRepository;

        public MessageService(MessageRepository messageRepository) {
                this.messageRepository = messageRepository;
        }

        public void submitMessage(MessageRequest messageRequest) {
                Message message = new Message(messageRequest.getUserEmail(),
                        messageRequest.getQuestion(), messageRequest.getTitle());
                messageRepository.save(message);
        }

        public void submitResponse(AdminResponse adminResponse) throws Exception {
                Optional<Message> message = messageRepository.findById(adminResponse.getId());
                if (message.isEmpty()) {
                        throw new Exception("message not found");
                }
                message.get().setAdminEmail(adminResponse.getAdminEmail());
                message.get().setResponse(adminResponse.getResponse());
                message.get().setClosed(true);
                messageRepository.save(message.get());
        }

}
