package core

type UuidGeneratorError struct {
	IsUuidGeneratorError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewUuidGeneratorError(code string, msg string, ctx *Context) *UuidGeneratorError {
	return &UuidGeneratorError{
		IsUuidGeneratorError: true,
		Sdk:              "UuidGenerator",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *UuidGeneratorError) Error() string {
	return e.Msg
}
