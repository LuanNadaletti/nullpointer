package com.nullpointer.service;

import com.nullpointer.domain.user.User;
import com.nullpointer.repository.QuestionRepository;
import com.nullpointer.specification.QuestionSpecification;
import org.junit.jupiter.api.BeforeEach;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Date;

public class QuestionServiceTests {

    @Mock
    private QuestionRepository questionRepository;

    @Mock
    private QuestionSpecification questionSpecification;

    @InjectMocks
    private QuestionService questionService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    /*
    @Test
    void testFindQuestionWithPagination() {
        Question question1 = new Question(1L, createMockUser(), "Title1", "Content1", new Date());
        Question question2 = new Question(2L, createMockUser(), "Title2", "Content2", new Date());
        List<Question> questions = Arrays.asList(question1, question2);

        Pageable pageable = PageRequest.of(0, 10, Sort.by("creationDate").descending());
        Page<Question> questionPage = new PageImpl<>(questions, pageable, questions.size());

        when(questionRepository.findAll(any(Specification.class), any(Pageable.class)))
                .thenReturn(questionPage);

        Page<Question> result = questionService.findQuestionsWithPagination(
                Optional.empty(),
                Optional.empty(),
                Optional.empty(),
                Optional.empty(),
                Optional.of("creationDate"),
                Optional.of(false),
                0,
                10
        );

        assertEquals(2, result.getTotalElements());
        assertEquals("Title1", result.getContent().get(0).getTitle());
        assertEquals("TestUser", result.getContent().get(0).getUser().getUsername());
    }
     */

    private User createMockUser() {
        return new User(1L, "TestUser", "testUser@email.com", "testUserPassword", new Date());
    }
}
