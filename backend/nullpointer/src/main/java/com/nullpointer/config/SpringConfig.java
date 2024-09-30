package com.nullpointer.config;

import com.nullpointer.domain.answer.Answer;
import com.nullpointer.domain.answer.AnswerDTO;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.modelmapper.record.RecordModule;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.web.config.EnableSpringDataWebSupport;

@Configuration
@EnableSpringDataWebSupport(pageSerializationMode = EnableSpringDataWebSupport.PageSerializationMode.VIA_DTO)
public class SpringConfig {

    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper().registerModule(new RecordModule());

        modelMapper.addMappings(
                new PropertyMap<AnswerDTO, Answer>() {
                    @Override
                    protected void configure() {
                        map(source.getQuestion(), destination.getQuestion());
                        map(source.getUser(), destination.getUser());
                    }
                }
        );

        return modelMapper;
    }
}
