export const FormState = {
  isSubmit: false,
}

export const FormActions = (self: any) => ({
  setIsSubmit(isSubmit: boolean) {
    self.isSubmit = isSubmit
  }
})